import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateMenuUseCase } from "./CreateMenuUseCase";

export class CreateMenuController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { schedule, local_id: localID } = request.body;

    const createMenuUseCase = container.resolve(CreateMenuUseCase);

    try {
      const menu = await createMenuUseCase.execute({ schedule, localID });

      return response.status(201).json(menu);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
