import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAlunoUseCase } from "./UpdateAlunoUseCase";

export class UpdateAlunoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { matricula } = request.params;
    const { name, cursoId, turmaId } = request.body;

    const updateAlunoUseCase = container.resolve(UpdateAlunoUseCase);

    try {
      await updateAlunoUseCase.execute({ matricula, name, cursoId, turmaId });

      return response.status(204).send();
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  }
}
