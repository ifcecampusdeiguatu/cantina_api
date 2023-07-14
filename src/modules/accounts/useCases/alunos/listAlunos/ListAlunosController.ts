import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAlunosUseCase } from "./ListAlunosUseCase";

export class ListAlunosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAlunosUseCase = container.resolve(ListAlunosUseCase);

    try {
      const alunos = await listAlunosUseCase.execute();

      return response.json(alunos);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
