import { UsersTokens } from "@prisma/client";

import { ICreateUserTokenDTO } from "../dtos/users/ICreateUserTokenDTO";

export interface IUsersTokensRepository {
  create({
    userId,
    expiresDate,
    refreshToken,
  }: ICreateUserTokenDTO): Promise<UsersTokens>;
}
