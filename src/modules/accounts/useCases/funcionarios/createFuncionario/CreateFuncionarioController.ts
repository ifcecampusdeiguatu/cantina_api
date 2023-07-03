import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateFuncionarioUseCase } from "./CreateFuncionarioUseCase";

export class CreateFuncionarioController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, role, userId } = request.body;

    const createFuncionarioUseCase = container.resolve(
      CreateFuncionarioUseCase
    );

    try {
      await createFuncionarioUseCase.execute({
        name,
        role,
        userId,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
