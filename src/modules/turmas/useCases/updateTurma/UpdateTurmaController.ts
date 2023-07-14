import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateTurmaUseCase } from "./UpdateTurmaUseCase";

export class UpdateTurmaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const updateTurmaUseCase = container.resolve(UpdateTurmaUseCase);

    try {
      await updateTurmaUseCase.execute({ id, name });

      return response.status(204).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
