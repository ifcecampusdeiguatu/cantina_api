import { inject, injectable } from "tsyringe";

import { ICreateUserRefreshTokenDTO } from "@modules/accounts/dtos/usersTokens/ICreateUserRefreshTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { PrismaClient, User, UsersTokens } from "@prisma/client";
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
  }: ICreateUserRefreshTokenDTO): Promise<UsersTokens> {
    const userToken = await this.repository.usersTokens.create({
      data: { userId, expiresDate, refreshToken },
    });

    return userToken;
  }

  async findByUserIdAndRefreshToken({
    userId,
    refreshToken,
  }: ICreateUserRefreshTokenDTO): Promise<UsersTokens> {
    const userToken = await this.repository.usersTokens.findFirst({
      where: {
        userId,
        refreshToken,
      },
      include: {
        user: true
      }
    });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.usersTokens.delete({
      where: {
        id,
      },
    });
  }
}
