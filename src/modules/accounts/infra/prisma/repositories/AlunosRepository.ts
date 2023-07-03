import { inject, injectable } from "tsyringe";

import { ICreateAlunosDTO } from "@modules/accounts/dtos/alunos/ICreateAlunosDTO";
import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";
import { Aluno, PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

@injectable()
export class AlunosRepository implements IAlunosRepository {
  private repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({
    matricula,
    name,
    turmaId,
    cursoId,
    userId,
  }: ICreateAlunosDTO): Promise<void> {
    await this.repository.aluno.create({
      data: {
        matricula,
        name,
        cursoId,
        turmaId,
        userId,
      },
    });
  }

  async findAlunoByMatricula(matricula: string): Promise<Aluno> {
    const aluno = await this.repository.aluno.findUnique({
      where: { matricula },
    });

    return aluno;
  }
}
