import { Request, Response } from "express";
import { container } from "tsyringe";

import { AddIngredientToFoodUseCase } from "./AddIngredientToFoodUseCase";

export class AddIngredientToFoodController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { ingredient_id: ingredientID } = request.body;
    const { food: foodID } = request.params;

    const addIngredientFoodToUseCase = container.resolve(
      AddIngredientToFoodUseCase
    );

    try {
      const food = await addIngredientFoodToUseCase.execute({
        foodID,
        ingredientID,
      });

      return response.status(203).json(food);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
