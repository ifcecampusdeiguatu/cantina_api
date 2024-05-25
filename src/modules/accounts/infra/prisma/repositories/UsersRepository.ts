import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import { ICreateUserDTO } from "@modules/accounts/dtos/users/ICreateUserDTO";
import { ParsedUser, UsersMap } from "@modules/accounts/mappers/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";
import { AppError } from "@shared/errors/AppError";

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
    id = uuid(),
    email,
    password,
    type = "aluno",
  }: ICreateUserDTO): Promise<void> {
    const dateNow = new Date();

    await this.repository.user.create({
      data: {
        id,
        email,
        password,
        type,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
    });
  }

  async list(): Promise<ParsedUser[]> {
    const users = await this.repository.user.findMany();

    const usersParsed = users.map((user) => UsersMap.toDTO(user));

    return usersParsed;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.repository.user.findFirst({ where: { email } });

    return user;
  }

  async findUserById(id: string): Promise<User> {
    return this.repository.user.findUnique({
      where: { id },
      include: {
        aluno: true,
        funcionario: true,
        servidor: true,
      },
    });
  }

  async findUserByMatricula(matricula: string): Promise<User> {
    const user = await this.repository.user.findFirst({
      where: {
        aluno: {
          Matricula: { some: { matricula } },
        },
      },
    });

    return user;
  }
}
