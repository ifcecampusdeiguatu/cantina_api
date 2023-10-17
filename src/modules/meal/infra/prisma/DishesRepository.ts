import { randomUUID } from "node:crypto";
import { inject, injectable } from "tsyringe";

import { IAddIngredientToDishDTO } from "@modules/meal/dtos/IAddIngredientToDishDTO";
import { ICreateDishDTO } from "@modules/meal/dtos/ICreateDishDTO";
import { IDishesRepository } from "@modules/meal/repositories/IDishesRepository";
import { Dish, PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

@injectable()
export class DishesRepository implements IDishesRepository {
  repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({ name, description }: ICreateDishDTO): Promise<Dish> {
    const dish = {
      id: randomUUID(),
      name,
      description,
    };

    const dateNow = new Date();

    return this.repository.dish.create({
      data: {
        ...dish,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
    });
  }

  async addIngredientToDish({
    dishID,
    ingredientID,
  }: IAddIngredientToDishDTO): Promise<Dish> {
    const dish = await this.repository.dish.update({
      where: { id: dishID },
      data: {
        updatedAt: new Date(),
        ingredients: {
          connect: { id: ingredientID },
        },
      },
      include: { ingredients: true },
    });

    return dish;
  }

  async findDishById(id: string): Promise<Dish> {
    return this.repository.dish.findUnique({ where: { id } });
  }
}
