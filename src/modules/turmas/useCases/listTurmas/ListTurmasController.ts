import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListTurmasUseCase } from "./ListTurmasUseCase";

export class ListTurmasController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTurmasUseCase = container.resolve(ListTurmasUseCase);

    try {
      const turmas = await listTurmasUseCase.execute();

      return response.json(turmas);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
