import { randomUUID } from "node:crypto";
import { inject, injectable } from "tsyringe";

import { ICreateIngredientsDTO } from "@modules/meal/dtos/ICreateIngredientsDTO";
import { IIngredientsRepository } from "@modules/meal/repositories/IIngredientsReposirory";
import { PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

import { Ingredient } from "../entities/Ingredients";

@injectable()
export class IngredientsRepository implements IIngredientsRepository {
  repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({
    name,
    description,
  }: ICreateIngredientsDTO): Promise<Ingredient> {
    const ingredient = {
      id: randomUUID(),
      name,
      description,
    };

    return this.repository.ingredient.create({ data: ingredient });
  }

  async findIngredientByName(name: string): Promise<Ingredient> {
    return this.repository.ingredient.findFirst({ where: { name } });
  }

  async findIngredientByID(id: string): Promise<Ingredient> {
    return this.repository.ingredient.findUnique({ where: { id } });
  }
}
