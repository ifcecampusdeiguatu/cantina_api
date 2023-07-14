import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateCursoUseCase } from "./UpdateCursoUseCase";

export class UpdateCursoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const updateCursoUseCase = container.resolve(UpdateCursoUseCase);

    try {
      await updateCursoUseCase.execute({ id, name });

      return response.status(204).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
