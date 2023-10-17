import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

import { ICreateMealDTO } from "@modules/meal/dtos/ICreateMealDTO";
import { IMealsRepository } from "@modules/meal/repositories/IMealsRepository";
import { PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

import { Meal } from "../entities/Meal";

@injectable()
export class MealsRepository implements IMealsRepository {
  repository: PrismaClient;
  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async findMealById(id: string): Promise<Meal> {
    const meal = this.repository.meal.findUnique({ where: { id } });

    return meal;
  }

  async create({ schedule, localId, dishId }: ICreateMealDTO): Promise<Meal> {
    const dateNow = new Date();

    const menu = await this.repository.meal.create({
      data: {
        id: v4(),
        schedule,
        localId,
        dishId,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
    });

    return menu;
  }

  async findMealBySchedule(schedule: Date): Promise<Meal> {
    return this.repository.meal.findFirst({ where: { schedule } });
  }
}
