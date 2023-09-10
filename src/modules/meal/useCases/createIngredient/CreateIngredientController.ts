import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateIngredientUseCase } from "./CreateIngredientUseCase";

export class CreateIngredientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createIngredientUseCase = container.resolve(CreateIngredientUseCase);

    try {
      const ingredient = await createIngredientUseCase.execute({
        name,
        description,
      });

      return response.status(201).json(ingredient);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
