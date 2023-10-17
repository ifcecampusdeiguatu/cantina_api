import { inject, injectable } from "tsyringe";

import { IAddIngredientToDishDTO } from "@modules/meal/dtos/IAddIngredientToDishDTO";
import { Dish } from "@modules/meal/infra/entities/Dish";
import { IDishesRepository } from "@modules/meal/repositories/IDishesRepository";
import { IIngredientsRepository } from "@modules/meal/repositories/IIngredientsReposirory";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class AddIngredientToDishUseCase {
  constructor(
    @inject("DishesRepository")
    private dishesRepository: IDishesRepository,
    @inject("IngredientsRepository")
    private ingredientsRepository: IIngredientsRepository
  ) {}

  async execute({
    dishID,
    ingredientID,
  }: IAddIngredientToDishDTO): Promise<Dish> {
    const dish = await this.dishesRepository.findDishById(dishID);

    if (!dish) {
      throw new AppError("Dish not found", 404);
    }

    const ingredient = await this.ingredientsRepository.findIngredientByID(
      ingredientID
    );

    if (!ingredient) {
      throw new AppError("Ingredient not found", 404);
    }

    return this.dishesRepository.addIngredientToDish({
      dishID,
      ingredientID,
    });
  }
}
