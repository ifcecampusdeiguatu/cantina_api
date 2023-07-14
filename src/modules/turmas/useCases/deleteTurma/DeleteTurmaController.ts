import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteTurmaUseCase } from "./DeleteTurmaUseCase";

export class DeleteTurmaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTurmaUseCase = container.resolve(DeleteTurmaUseCase);

    try {
      await deleteTurmaUseCase.execute(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
