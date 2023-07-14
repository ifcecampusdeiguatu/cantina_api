import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCursosUseCase } from "./ListCursosUseCase";

export class ListCursosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCursosUseCase = container.resolve(ListCursosUseCase);

    try {
      const cursos = await listCursosUseCase.execute();

      return response.json(cursos);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
