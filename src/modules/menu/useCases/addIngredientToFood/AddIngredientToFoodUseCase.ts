import { inject, injectable } from "tsyringe";

import { IAddIngredientToFoodDTO } from "@modules/menu/dtos/IAddIngredientToFoodDTO";
import { Food } from "@modules/menu/infra/entities/Food";
import { IFoodsRepository } from "@modules/menu/repositories/IFoodsRepository";
import { IIngredientsRepository } from "@modules/menu/repositories/IIngredientsReposirory";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class AddIngredientToFoodUseCase {
  constructor(
    @inject("FoodsRepository")
    private foodsRepository: IFoodsRepository,
    @inject("IngredientsRepository")
    private ingredientsRepository: IIngredientsRepository
  ) {}

  async execute({
    foodID,
    ingredientID,
  }: IAddIngredientToFoodDTO): Promise<Food> {
    const food = await this.foodsRepository.findFoodById(foodID);

    if (!food) {
      throw new AppError("Food not found", 404);
    }

    const ingredient = await this.ingredientsRepository.findIngredientByID(
      ingredientID
    );

    if (!ingredient) {
      throw new AppError("Ingredient not found", 404);
    }

    return this.foodsRepository.addIngredientToFood({
      foodID,
      ingredientID,
    });
  }
}
