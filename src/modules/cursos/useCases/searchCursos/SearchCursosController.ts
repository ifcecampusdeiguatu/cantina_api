import { Request, Response } from "express";
import { container } from "tsyringe";

import { SearchCursosUseCase } from "./SearchCursosUseCase";

export class SearchCursoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const cursoName = typeof name === "string" ? name : undefined;

    const searchsCursoUseCase = container.resolve(SearchCursosUseCase);

    try {
      const curso = await searchsCursoUseCase.execute(cursoName);

      return response.json(curso);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
