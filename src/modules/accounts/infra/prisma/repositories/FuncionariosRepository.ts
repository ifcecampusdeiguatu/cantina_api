import { inject, injectable } from "tsyringe";

import { ICreateFuncionarioDTO } from "@modules/accounts/dtos/funcionarios/ICreateFuncionarioDTO";
import { IFuncionariosRepository } from "@modules/accounts/repositories/IFuncionariosRepository";
import { Funcionario, PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

@injectable()
export class FuncionariosRepository implements IFuncionariosRepository {
  private repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({ name, role, userId }: ICreateFuncionarioDTO): Promise<void> {
    await this.repository.funcionario.create({
      data: {
        name,
        role,
        userId,
      },
    });
  }

  async findFuncionarioByID(id: string): Promise<Funcionario> {
    const aluno = await this.repository.funcionario.findUnique({
      where: { id },
    });

    return aluno;
  }

  async findFuncionarioByUserId(userId: string): Promise<Funcionario> {
    const funcionario = await this.repository.funcionario.findFirst({
      where: { userId },
    });

    return funcionario;
  }
}
