import { Request, Response } from "express";
import { container } from "tsyringe";

import { Turma } from "@prisma/client";

import { FindTurmaUseCase } from "./FindTurmaUseCase";

export class FindTurmaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findTurmaUseCase = container.resolve(FindTurmaUseCase);

    try {
      const turma: Turma = await findTurmaUseCase.execute(id);

      return response.json(turma);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
