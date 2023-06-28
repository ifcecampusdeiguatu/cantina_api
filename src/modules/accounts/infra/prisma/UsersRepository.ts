import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import { ICreateUserDTO } from "@modules/accounts/dtos/users/ICreateUserDTO";
import { ParsedUser, UsersMap } from "@modules/accounts/mappers/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { PrismaClient, User } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

@injectable()
export class UsersRepository implements IUsersRepository {
  repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({
    email,
    password,
    type = "aluno",
  }: ICreateUserDTO): Promise<void> {
    await this.repository.user.create({
      data: { id: uuid(), email, password, type },
    });
  }

  async list(): Promise<ParsedUser[]> {
    const users = await this.repository.user.findMany();

    const usersParsed = users.map((user) => UsersMap.toDTO(user));

    return usersParsed;
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.repository.user.findFirst({ where: { email } });
  }
}
