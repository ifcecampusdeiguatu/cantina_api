import { inject, injectable } from "tsyringe";

import { ICreateMatriculaDTO } from "@modules/accounts/dtos/matriculas/ICreateMatriculaDTO";
import { IUpdateMatriculaDTO } from "@modules/accounts/dtos/matriculas/IUpdateMatriculaDTO";
import { IMatriculasRepository } from "@modules/accounts/repositories/IMatriculasRepository";
import { PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

import { Matricula } from "../../entities/Matricula";

@injectable()
export class MatriculaRepository implements IMatriculasRepository {
  private repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({
    matricula,
    situacaoMatricula,
    turno,
    alunoCpf,
    turmaId,
    cursoId,
  }: ICreateMatriculaDTO): Promise<Matricula> {
    const matriculaCreated = new Matricula();

    Object.assign(matriculaCreated, {
      matricula,
      situacaoMatricula,
      turno,
      alunoCpf,
      turmaId,
      cursoId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.repository.matricula.create({
      data: { ...matriculaCreated },
    });

    return matriculaCreated;
  }

  async list(): Promise<Matricula[]> {
    const matriculas = await this.repository.matricula.findMany();

    return matriculas;
  }

  async update({
    matricula,
    newMatricula,
    situacaoMatricula,
    turno,
    alunoCpf,
    turmaId,
    cursoId,
  }: IUpdateMatriculaDTO): Promise<Matricula> {
    const matriculaUpdated = await this.repository.matricula.update({
      where: { matricula },
      data: {
        matricula: newMatricula,
        situacaoMatricula,
        turno,
        alunoCpf,
        turmaId,
        cursoId,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });

    return matriculaUpdated;
  }

  async delete(matricula: string): Promise<void> {
    await this.repository.matricula.delete({ where: { matricula } });
  }

  async findMatriculasByAlunoCpf(cpf: string): Promise<Matricula> {
    const matricula = await this.repository.matricula.findFirst({
      where: { alunoCpf: cpf },
    });

    return matricula;
  }

  async findMatricula(matricula: string): Promise<Matricula> {
    return this.repository.matricula.findFirst({
      where: { matricula },
    });
  }
}
