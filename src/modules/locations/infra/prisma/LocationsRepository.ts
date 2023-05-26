import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import { PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

import { Local } from "../entities/Local";
import { ILocationsRepository } from "../../repositories/ILocationsRepository";

interface ICreateLocalDTO {
  address: string;
}

@injectable()
export class LocationsRepository implements ILocationsRepository {
  repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({ address }: ICreateLocalDTO): Promise<Local> {
    const local = await this.repository.local.create({
      data: {
        id: uuid(),
        address,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return local;
  }
  async findLocalById(id: string): Promise<Local> {
    return this.repository.local.findUnique({ where: { id } });
  }
}
