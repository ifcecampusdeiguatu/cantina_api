import { inject, injectable } from "tsyringe";

import { ICreateAlunosDTO } from "@modules/accounts/dtos/alunos/ICreateAlunosDTO";
import { IUpdateAlunoDTO } from "@modules/accounts/dtos/alunos/IUpdateAlunoDTO";
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
    const dateNow = new Date();

    await this.repository.aluno.create({
      data: {
        matricula,
        name,
        cursoId,
        turmaId,
        userId,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
    });
  }

  async findAlunoByMatricula(matricula: string): Promise<Aluno> {
    const aluno = await this.repository.aluno.findUnique({
      where: { matricula },
    });

    return aluno;
  }

  async list(): Promise<Aluno[]> {
    const alunos = await this.repository.aluno.findMany();

    return alunos;
  }

  async update({
    matricula,
    name,
    cursoId,
    turmaId,
  }: IUpdateAlunoDTO): Promise<void> {
    await this.repository.aluno.update({
      where: {
        matricula,
      },
      data: {
        name,
        cursoId,
        turmaId,
        updatedAt: new Date(),
      },
    });
  }

  async delete(matricula: string): Promise<void> {
    await this.repository.aluno.delete({
      where: { matricula },
    });
  }
}
