import { inject, injectable } from "tsyringe";

import { ICreateAlunosDTO } from "@modules/accounts/dtos/alunos/ICreateAlunosDTO";
import { IDeleteAlunoDTO } from "@modules/accounts/dtos/alunos/IDeleteAlunoDTO";
import { IUpdateAlunoDTO } from "@modules/accounts/dtos/alunos/IUpdateAlunoDTO";
import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";
import { PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

import { Aluno } from "../../entities/Aluno";

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
    cpf,
    nome,
    sexo,
    cidade,
    userId,
  }: ICreateAlunosDTO): Promise<Aluno> {
    const alunoData = new Aluno();
    const dateNow = new Date();

    Object.assign(alunoData, {
      cpf,
      nome,
      sexo,
      cidade,
      createdAt: dateNow,
      updatedAt: dateNow,
      userId,
    });
    console.log(alunoData);

    try {
      const aluno = await this.repository.aluno.create({
        data: { ...alunoData },
      });

      return aluno;
    } catch (err) {
      console.log(err);
    }
  }

  async findAlunoByMatricula(matricula: string): Promise<Aluno> {
    throw new Error(`Method not implemented. ${matricula}`);
  }

  async list({order='asc', limit=-1, matriculas=true}:{order?: "asc" | "desc", limit?: number, matriculas?: boolean}): Promise<Aluno[]> {
    const alunos = await this.repository.aluno.findMany(
      { 
        take: limit > 0 ? limit : undefined,
        include: {Matricula: matriculas},
        orderBy: { nome: order },
      });

    return alunos;
  }

  async findAlunoByCpf({cpf, matriculas}:{cpf: string, matriculas: boolean}): Promise<Aluno> {
    const aluno = await this.repository.aluno.findUnique({
      where: { cpf },
      include: { Matricula: matriculas },
    });

    return aluno;
  }

  findAlunoByUserId(cpf: string): Promise<Aluno> {
    throw new Error("Method not implemented.");
  }

  async update({ userId, cpf, cidade, nome, sexo }: IUpdateAlunoDTO): Promise<void> {
    await this.repository.aluno.update({
      where: {
        cpf,
      },
      data: {
        nome,
        cidade,
        sexo,
        updatedAt: new Date(),
      },
    });
  }

  async delete({ cpf, userId }: IDeleteAlunoDTO): Promise<void> {
    if (cpf) {
      await this.repository.aluno.delete({
        where: { cpf },
      });
    }

    if (userId) {
      await this.repository.aluno.delete({
        where: { userId },
      });
    }
  }
}
