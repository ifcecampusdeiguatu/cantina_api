import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { User } from "@modules/accounts/infra/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

type AlunoCredentials = { email?: never; matricula: string; password: string };

type DefaultCredentials = {
  matricula?: never;
  email: string;
  password: string;
};

type IRequest = DefaultCredentials | AlunoCredentials;

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password, matricula }: IRequest) {
    let user: User;
    let refreshTokenExpireDate: Date;

    const credentials = {
      token: "",
      user: {
        id: "",
        email: "",
        type: "",
      },
      refreshToken: "",
    };

    if (matricula) {
      user = await this.loginByMatricula({ matricula, password });

      const tokens = await this.generateToken(user);

      refreshTokenExpireDate = tokens.refreshTokenExpireDate;

      Object.assign(credentials, {
        token: tokens.token,
        user: {
          id: user.id,
          email: user?.email,
          type: user.type,
        },
        refreshToken: tokens.refreshToken,
      });
    }

    if (email) {
      user = await this.loginDefault({ email, password });

      const tokens = await this.generateToken(user);

      refreshTokenExpireDate = tokens.refreshTokenExpireDate;

      Object.assign(credentials, {
        token: tokens.token,
        user: {
          id: user.id,
          email: user?.email,
          type: user.type,
        },
        refreshToken: tokens.refreshToken,
      });
    }

    await this.usersTokensRepository.deleteTokensByUserId(user.id);

    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken: credentials.refreshToken,
      expiresDate: refreshTokenExpireDate,
    });

    return credentials;
  }

  async loginByMatricula({ matricula, password }: AlunoCredentials) {
    const user = await this.usersRepository.findUserByMatricula(matricula);

    if (!user) {
      throw new AppError("Matricula ou senha está incorreta");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Matricula ou senha está incorreta");
    }

    return user;
  }

  async loginDefault({ email, password }: DefaultCredentials) {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("Email ou senha está incorreta");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email ou senha está incorreta");
    }

    return user;
  }

  async generateToken(user: User) {
    const tokenData = { id: user.id, email: user?.email, type: user.type };

    const token = sign({ user: { ...tokenData } }, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    const refreshToken = sign(
      { user: { ...tokenData } },
      auth.secret_refresh_token,
      {
        subject: user.id,
        expiresIn: auth.expires_in_refresh_token,
      }
    );

    const refreshTokenExpireDate = this.dateProvider.addDays(
      new Date(),
      auth.expires_refresh_token_days
    );

    return { token, refreshToken, refreshTokenExpireDate };
  }
}
