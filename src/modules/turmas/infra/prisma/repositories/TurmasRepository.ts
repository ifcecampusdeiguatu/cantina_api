import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import { ITurmasRepository } from "@modules/turmas/repositories/ITurmasRepository";
import { Turma, PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

interface ICreateTurmaDTO {
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

  async create({ id = uuid(), name }: ICreateTurmaDTO): Promise<void> {
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
  async findTurmaById(id: string): Promise<Turma> {
    const turma = await this.repository.turma.findUnique({ where: { id } });

    return turma;
  }

  async list(): Promise<Turma[]> {
    const turmas = await this.repository.turma.findMany();

    return turmas;
  }
}
