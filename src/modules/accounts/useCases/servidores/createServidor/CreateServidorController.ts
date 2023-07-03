import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateServidorUseCase } from "./CreateServidorUseCase";

export class CreateServidorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { siape, name, role, userId } = request.body;

    const createServidorUseCase = container.resolve(CreateServidorUseCase);

    try {
      await createServidorUseCase.execute({
        siape,
        name,
        role,
        userId,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
