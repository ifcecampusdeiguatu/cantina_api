import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAlunosUseCase } from "./GetAlunoUseCase";

export class GetAlunosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;
    const { matriculas } = request.query;

    const getAlunosUseCase = container.resolve(GetAlunosUseCase);

    if (!cpf) {
      return response.status(400).json({ error: "CPF não informado" });
    }

    try {
      const aluno = await getAlunosUseCase.execute({cpf, matriculas: !(String(matriculas).toLowerCase() === "false") });

      return response.json(aluno);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
