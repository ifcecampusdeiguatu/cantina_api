import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email?: string;
  matricula?: string;
  password: string;
}

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
    const user = matricula
      ? await this.usersRepository.findUserByMatricula(matricula)
      : await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError(
        `${matricula ? "Matricula" : "Email"} ou senha está incorreto`
      );
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(
        `${matricula ? "Matricula" : "Email"} ou senha está incorreto`
      );
    }

    const tokenData = matricula
      ? { email: user.email, type: user.type, matricula }
      : { email, type: user.type };

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

    await this.usersTokensRepository.create({
      userId: user.id,
      expiresDate: refreshTokenExpireDate,
      refreshToken,
    });

    return matricula
      ? {
          token,
          user: {
            id: user.id,
            matricula,
            email: user.email,
            type: user.type,
          },
          refreshToken,
        }
      : {
          token,
          user: {
            id: user.id,
            email: user.email,
            type: user.type,
          },
          refreshToken,
        };
  }
}
