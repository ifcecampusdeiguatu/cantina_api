import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import { ITurmasRepository } from "@modules/turmas/repositories/ITurmasRepository";
import { Turma, PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

interface ICreateTurmasDTO {
  id?: string;
  name: string;
}

@injectable()
export class TurmasRepository implements ITurmasRepository {
  repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({ id = uuid(), name }: ICreateTurmasDTO): Promise<void> {
    await this.repository.turma.create({
      data: {
        id,
        name,
      },
    });
  }

  async findTurmaByName(name: string): Promise<Turma> {
    const turma = await this.repository.turma.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    return turma;
  }

  async searchTurmasByName(name: string): Promise<Turma[]> {
    const turma = await this.repository.turma.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    return turma;
  }

  async findTurmaById(id: string): Promise<Turma> {
    const turma = await this.repository.turma.findUnique({ where: { id } });

    return turma;
  }

  async list(): Promise<Turma[]> {
    const turmas = await this.repository.turma.findMany();

    return turmas;
  }

  async delete(id: string): Promise<void> {
    await this.repository.turma.delete({ where: { id } });
  }

  async update({ id, name }: ICreateTurmasDTO): Promise<void> {
    await this.repository.turma.update({
      where: { id },
      data: {
        name,
        updatedAt: new Date(),
      },
    });
  }
}
