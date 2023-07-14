import { Request, Response } from "express";
import { container } from "tsyringe";

import { SearchTurmasUseCase } from "./SearchTurmasUseCase";

export class SearchTurmaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const turmaName = typeof name === "string" ? name : undefined;

    const searchsTurmaUseCase = container.resolve(SearchTurmasUseCase);

    try {
      const turma = await searchsTurmaUseCase.execute(turmaName);

      return response.json(turma);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
