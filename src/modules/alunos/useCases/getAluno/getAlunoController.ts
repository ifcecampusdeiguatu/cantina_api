import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAlunoUseCase } from "./getAlunoUseCase";

export class GetAlunoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { matricula } = request.params;

    const getAlunoUseCase = container.resolve(GetAlunoUseCase);

    try {
      const aluno = await getAlunoUseCase.execute(matricula);

      return response.json(aluno);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
