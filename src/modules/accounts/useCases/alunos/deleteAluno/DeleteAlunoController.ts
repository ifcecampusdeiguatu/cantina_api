import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteAlunoUseCase } from "./DeleteAlunoUseCase";

export class DeleteAlunoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;

    const deleteAlunoUseCase = container.resolve(DeleteAlunoUseCase);

    try {
      await deleteAlunoUseCase.execute(cpf);

      return response.status(204).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
