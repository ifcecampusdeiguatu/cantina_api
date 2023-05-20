import { inject, injectable } from "tsyringe";

import { ICreateAlunosDTO } from "@modules/alunos/dtos/ICreateAlunosDTO";
import { IAlunosRepository } from "@modules/alunos/repositories/IAlunosRepository";
import { Aluno, PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

@injectable()
export class AlunosRepository implements IAlunosRepository {
  repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({
    matricula,
    name,
    turma,
    curso,
  }: ICreateAlunosDTO): Promise<Aluno> {
    const aluno: Aluno = {
      matricula,
      name,
      turma,
      curso,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    await this.repository.aluno.create({ data: aluno });

    return aluno;
  }

  async findAlunoByMatricula(matricula: string): Promise<Aluno> {
    const aluno = await this.repository.aluno.findUnique({
      where: { matricula },
    });

    return aluno;
  }
}
