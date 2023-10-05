import { User, UsersTokens } from "@prisma/client";

import { ICreateUserRefreshTokenDTO } from "../dtos/usersTokens/ICreateUserRefreshTokenDTO";
import { IFindByUserIdAndRefreshTokenDTO } from "../dtos/usersTokens/IFindByUserIdAndRefreshTokenDTO";

export interface IUsersTokensRepository {
  create({
    userId,
    expiresDate,
    refreshToken,
  }: ICreateUserRefreshTokenDTO): Promise<UsersTokens>;
  findByUserIdAndRefreshToken({
    userId,
    refreshToken,
  }: IFindByUserIdAndRefreshTokenDTO): Promise<UsersTokens>;
  deleteById(id: string): Promise<void>;
}
