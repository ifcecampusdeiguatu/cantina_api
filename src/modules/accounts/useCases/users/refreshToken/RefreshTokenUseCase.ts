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
    const { sub: userId } = verify(
      refreshToken,
      auth.secret_refresh_token
    ) as IPayload;

    console.log(userId);

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken({
        userId,
        refreshToken,
      });

    if (!userToken) {
      throw new AppError("Refresh token não existe");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const token = sign({}, auth.secret_token, {
      subject: userToken.userId,
      expiresIn: auth.expires_in_token,
    });

    const newRefreshToken = sign({}, auth.secret_refresh_token, {
      subject: userToken.userId,
      expiresIn: auth.expires_in_refresh_token,
    });

    const refreshTokenExpireDate = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.usersTokensRepository.create({
      userId,
      expiresDate: refreshTokenExpireDate,
      refreshToken: newRefreshToken,
      token,
    });

    return {
      token,
      refreshToken: newRefreshToken,
    };
  }
}
