import { Request, Response } from "express";
import { container } from "tsyringe";

import { AddIngredientToDishUseCase } from "./AddIngredientToDishUseCase";

export class AddIngredientToDishController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { ingredient_id: ingredientID } = request.body;
    const { dish: dishID } = request.params;

    const addIngredientDishToUseCase = container.resolve(
      AddIngredientToDishUseCase
    );

    try {
      const dish = await addIngredientDishToUseCase.execute({
        dishID,
        ingredientID,
      });

      return response.status(203).json(dish);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
