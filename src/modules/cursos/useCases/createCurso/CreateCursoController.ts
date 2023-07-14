import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCursoUseCase } from "./CreateCursoUseCase";

export class CreateCursoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, name } = request.body;

    const createCursosUseCase = container.resolve(CreateCursoUseCase);

    try {
      await createCursosUseCase.execute({ id, name });

      return response.status(201).json();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
