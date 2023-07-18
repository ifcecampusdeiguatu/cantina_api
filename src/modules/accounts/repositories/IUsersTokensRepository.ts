import { UsersTokens } from "@prisma/client";

import { ICreateUserRefreshTokenDTO } from "../dtos/usersTokens/ICreateUserRefreshTokenDTO";
import { IFindByUserIdAndRefreshTokenDTO } from "../dtos/usersTokens/IFindByUserIdAndRefreshTokenDTO";

export interface IUsersTokensRepository {
  create({
    userId,
    expiresDate,
    refreshToken,
    token,
  }: ICreateUserRefreshTokenDTO): Promise<UsersTokens>;
  findByUserIdAndRefreshToken({
    userId,
    refreshToken,
  }: IFindByUserIdAndRefreshTokenDTO): Promise<UsersTokens>;
  deleteById(id: string): Promise<void>;
  findByToken(token: string): Promise<UsersTokens>;
}
