import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { verifyToken } from "@utils/verifyToken";

interface ITokens {
  token: string;
  refreshToken: string;
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
    const { userId, user } = verifyToken(
      refreshToken,
      auth.secret_refresh_token
    );

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken({
        userId,
        refreshToken,
      });

    if (!userToken) {
      throw new AppError("Refresh Token não encontrado ou não existe", 404);
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const tokenData = { id: user.id, email: user.email, type: user.type };

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
