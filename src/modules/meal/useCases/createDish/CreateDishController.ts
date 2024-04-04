import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateDishUseCase } from "./CreateDishUseCase";

export class CreateDishController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    console.log(name, description);

    const createDishUseCase = container.resolve(CreateDishUseCase);

    try {
      const dish = await createDishUseCase.execute({
        name,
        description,
      });

      return response.status(201).json(dish);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
