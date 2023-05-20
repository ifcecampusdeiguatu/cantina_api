import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAlunosUseCase } from "./CreateAlunosUseCase";

export class CreateAlunosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { matricula, name, turma, curso } = request.body;

    const createAlunosUseCase = container.resolve(CreateAlunosUseCase);

    try {
      await createAlunosUseCase.execute({ matricula, name, turma, curso });

      return response.json({ create: true });
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
