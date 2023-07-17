import { inject, injectable } from "tsyringe";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/users/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { PrismaClient, UsersTokens } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

@injectable()
export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({
    userId,
    expiresDate,
    refreshToken,
  }: ICreateUserTokenDTO): Promise<UsersTokens> {
    const userToken = await this.repository.usersTokens.create({
      data: { userId, expiresDate, refreshToken },
    });

    return userToken;
  }
}
