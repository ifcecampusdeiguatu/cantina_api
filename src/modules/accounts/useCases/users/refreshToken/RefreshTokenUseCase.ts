import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface ITokens {
  token: string;
  refreshToken: string;
}

interface IPayload {
  sub: string;
  user: {
    email: string;
    type: "aluno" | "servidor" | "funcionario";
    matricula?: string;
  };
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(refreshToken: string): Promise<ITokens> {
    const { sub: userId, user } = verify(
      refreshToken,
      auth.secret_refresh_token
    ) as IPayload;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken({
        userId,
        refreshToken,
      });

    if (!userToken) {
      throw new AppError("Refresh token não existe");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const tokenData = user.matricula
      ? { email: user.email, type: user.type, matricula: user.matricula }
      : { email: user.email, type: user.type };

    const token = sign({ user: { ...tokenData } }, auth.secret_token, {
      subject: userToken.userId,
      expiresIn: auth.expires_in_token,
    });

    const newRefreshToken = sign(
      { user: { ...tokenData } },
      auth.secret_refresh_token,
      {
        subject: userToken.userId,
        expiresIn: auth.expires_in_refresh_token,
      }
    );

    const refreshTokenExpireDate = this.dateProvider.addDays(
      new Date(),
      auth.expires_refresh_token_days
    );

    await this.usersTokensRepository.create({
      userId,
      expiresDate: refreshTokenExpireDate,
      refreshToken: newRefreshToken,
    });

    return {
      token,
      refreshToken: newRefreshToken,
    };
  }
}
