import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateTurmasUseCase } from "./CreateTurmaUseCase";

export class CreateTurmaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, name } = request.body;

    const createTurmasUseCase = container.resolve(CreateTurmasUseCase);

    try {
      await createTurmasUseCase.execute({ id, name });

      return response.status(201).json();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
