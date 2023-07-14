import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCursoUseCase } from "./DeleteCursoUseCase";

export class DeleteCursoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCursoUseCase = container.resolve(DeleteCursoUseCase);

    try {
      await deleteCursoUseCase.execute(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
