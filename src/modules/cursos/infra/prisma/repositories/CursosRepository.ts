import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import { ICursosRepository } from "@modules/cursos/repositories/ICursosRepository";
import { Curso, PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

interface ICreateCursosDTO {
  id?: string;
  name: string;
}

@injectable()
export class CursosRepository implements ICursosRepository {
  repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({ id = uuid(), name }: ICreateCursosDTO): Promise<void> {
    await this.repository.curso.create({
      data: {
        id,
        name,
      },
    });
  }

  async findCursoByName(name: string): Promise<Curso> {
    const curso = await this.repository.curso.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    return curso;
  }

  async searchCursosByName(name: string): Promise<Curso[]> {
    const curso = await this.repository.curso.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    return curso;
  }

  async findCursoById(id: string): Promise<Curso> {
    const curso = await this.repository.curso.findUnique({ where: { id } });

    return curso;
  }

  async list(): Promise<Curso[]> {
    const cursos = await this.repository.curso.findMany();

    return cursos;
  }

  async delete(id: string): Promise<void> {
    await this.repository.curso.delete({ where: { id } });
  }

  async update({ id, name }: ICreateCursosDTO): Promise<void> {
    await this.repository.curso.update({
      where: { id },
      data: {
        name,
        updatedAt: new Date(),
      },
    });
  }
}
