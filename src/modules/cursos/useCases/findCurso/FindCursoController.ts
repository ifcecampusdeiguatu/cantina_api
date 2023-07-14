import { Request, Response } from "express";
import { container } from "tsyringe";

import { Curso } from "@prisma/client";

import { FindCursoUseCase } from "./FindCursoUseCase";

export class FindCursoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findCursoUseCase = container.resolve(FindCursoUseCase);

    try {
      const curso: Curso = await findCursoUseCase.execute(id);

      return response.json(curso);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
