import { randomUUID } from "node:crypto";
import { inject, injectable } from "tsyringe";

import { IAddIngredientToFoodDTO } from "@modules/menu/dtos/IAddIngredientToFoodDTO";
import { ICreateFoodDTO } from "@modules/menu/dtos/ICreateFoodDTO";
import { IFoodsRepository } from "@modules/menu/repositories/IFoodsRepository";
import { Food, PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

@injectable()
export class FoodsRepository implements IFoodsRepository {
  repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({ name, description }: ICreateFoodDTO): Promise<Food> {
    const food = {
      id: randomUUID(),
      name,
      description,
    };

    const dateNow = new Date();

    return this.repository.food.create({
      data: {
        ...food,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
    });
  }

  async addIngredientToFood({
    foodID,
    ingredientID,
  }: IAddIngredientToFoodDTO): Promise<Food> {
    const food = await this.repository.food.update({
      where: { id: foodID },
      data: {
        updatedAt: new Date(),
        ingredients: {
          connect: { id: ingredientID },
        },
      },
      include: { ingredients: true },
    });

    return food;
  }

  async findFoodById(id: string): Promise<Food> {
    return this.repository.food.findUnique({ where: { id } });
  }
}
