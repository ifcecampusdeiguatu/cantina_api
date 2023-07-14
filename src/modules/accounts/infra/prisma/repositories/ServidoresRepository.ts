import { inject, injectable } from "tsyringe";

import { ICreateServidorDTO } from "@modules/accounts/dtos/servidores/ICreateServidorDTO";
import { IServidoresRepository } from "@modules/accounts/repositories/IServidoresRepository";
import { PrismaClient, Servidor } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

@injectable()
export class ServidoresRepository implements IServidoresRepository {
  repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({
    siape,
    role,
    name,
    userId,
  }: ICreateServidorDTO): Promise<void> {
    await this.repository.servidor.create({
      data: { siape, role, name, userId },
    });
  }

  async findServidorBySIAPE(siape: string): Promise<Servidor> {
    const servidor = await this.repository.servidor.findUnique({
      where: { siape },
    });

    return servidor;
  }

  async findServidorBySIAPEOrUserId(
    siape: string,
    userId: string
  ): Promise<Servidor> {
    const servidor = await this.repository.servidor.findFirst({
      where: { OR: [{ siape }, { userId }] },
    });

    return servidor;
  }
}
