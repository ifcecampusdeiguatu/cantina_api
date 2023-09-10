import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateFoodUseCase } from "./CreateFoodUseCase";

export class CreateFoodController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createFoodUseCase = container.resolve(CreateFoodUseCase);

    try {
      const food = await createFoodUseCase.execute({
        name,
        description,
      });

      return response.status(201).json(food);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
