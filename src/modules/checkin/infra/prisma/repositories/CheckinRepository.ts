import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import { ICreateCheckinDTO } from "@modules/checkin/dtos/ICreateCheckinDTO";
import { IUpdateStatusCheckinDTO } from "@modules/checkin/dtos/IUpdateStatusCheckinDTO";
import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

import { Checkin } from "../../entities/Checkin";

@injectable()
export class CheckinRepository implements ICheckinRepository {
  repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({
    id = uuid(),
    status,
    mealId,
    userId,
    expiresDate,
  }: ICreateCheckinDTO): Promise<Checkin> {
    const dateNow = new Date();

    const checkin = await this.repository.checkin.create({
      data: {
        id,
        status,
        mealId,
        userId,
        createdAt: dateNow,
        updatedAt: dateNow,
        expiresDate,
      },
    });

    return checkin;
  }

  async findById(id: string): Promise<Checkin> {
    return this.repository.checkin.findUnique({ where: { id } });
  }

  async list(): Promise<Checkin[]> {
    return this.repository.checkin.findMany();
  }

  async updateStatus({ id, status }: IUpdateStatusCheckinDTO): Promise<void> {
    await this.repository.checkin.update({
      where: { id },
      data: { status },
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.checkin.delete({ where: { id } });
  }
}
