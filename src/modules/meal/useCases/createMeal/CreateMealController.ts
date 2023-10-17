import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateMealUseCase } from "./CreateMealUseCase";

export class CreateMealController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { schedule, local_id: localId, dish_id: dishId } = request.body;

    const createMenuUseCase = container.resolve(CreateMealUseCase);

    try {
      const menu = await createMenuUseCase.execute({
        schedule,
        localId,
        dishId,
      });

      return response.status(201).json(menu);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
