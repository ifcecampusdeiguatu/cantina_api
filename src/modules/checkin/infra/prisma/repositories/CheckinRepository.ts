import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import { ICreateCheckinDTO } from "@modules/checkin/dtos/ICreateCheckinDTO";
import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

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
  }: ICreateCheckinDTO): Promise<void> {
    const dateNow = new Date();

    await this.repository.checkin.create({
      data: {
        id,
        status,
        mealId,
        userId,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
    });
  }
}
