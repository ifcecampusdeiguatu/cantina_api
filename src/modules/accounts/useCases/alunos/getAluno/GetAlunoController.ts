import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAlunosUseCase } from "./GetAlunoUseCase";

export class GetAlunosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { matricula } = request.params;

    const getAlunosUseCase = container.resolve(GetAlunosUseCase);

    try {
      const aluno = await getAlunosUseCase.execute(matricula);

      return response.json(aluno);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
