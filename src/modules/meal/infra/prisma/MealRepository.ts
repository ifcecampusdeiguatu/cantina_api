import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

import { ICreateMealDTO } from "@modules/meal/dtos/ICreateMealDTO";
import { IMealRepository } from "@modules/meal/repositories/IMealRepository";
import { Meal, PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

import { Menu } from "../entities/Menu";

@injectable()
export class MealRepository implements IMealRepository {
  repository: PrismaClient;
  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }
  findMealBySchedule(schedule: Date): Promise<Meal> {
    throw new Error(`Method not implemented.${schedule.toString()}`);
  }

  findMealById(id: string): Promise<Meal> {
    return this.repository.meal.findUnique({ where: { id } });
  }

  async create({ schedule, localID }: ICreateMealDTO): Promise<Meal> {
    const dateNow = new Date();

    const menu = await this.repository.meal.create({
      data: {
        id: v4(),
        schedule,
        localID,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
    });

    return menu;
  }

  async findMenuBySchedule(schedule: Date): Promise<Menu> {
    return this.repository.meal.findFirst({ where: { schedule } });
  }
}
