import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, type } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    try {
      await createUserUseCase.execute({ email, password, type });

      return response.status(201).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
