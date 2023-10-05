import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import { ICreateCheckinDTO } from "@modules/checkin/dtos/ICreateCheckinDTO";
import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { Checkin, PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";
import { IUpdateStatusCheckinDTO } from "@modules/checkin/dtos/IUpdateStatusCheckinDTO";

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
    expiresDate
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
        expiresDate
      },
    });
  }
  
  async findById(id: string): Promise<Checkin> {
    return this.repository.checkin.findUnique({where: {id: id}});
  }
  
  async list(): Promise<Checkin[]> {
    return this.repository.checkin.findMany();
  }
  async updateStatus({id, status}: IUpdateStatusCheckinDTO): Promise<void> {
    await this.repository.checkin.update({where: {id}, data: {status: status}});
  }

  async delete(id: string): Promise<void> {
    await this.repository.checkin.delete({where: {id}});
  }
}
