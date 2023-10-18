import { Request, Response } from "express";
import { container } from "tsyringe";

import { AddIngredientToDishUseCase } from "./AddIngredientToFoodUseCase";

export class AddIngredientToDishController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { ingredient_id: ingredientId } = request.body;
    const { dish: dishId } = request.params;

    const addIngredientDishToUseCase = container.resolve(
      AddIngredientToDishUseCase
    );

    try {
      const dish = await addIngredientDishToUseCase.execute({
        dishId,
        ingredientId,
      });

      return response.status(203).json(dish);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
