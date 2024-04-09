import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { matricula, email, password } = request.body;

    console.log(matricula, email, password);

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    try {
      const user = await authenticateUserUseCase.execute({
        matricula,
        email,
        password,
      });

      return response.status(200).json(user);
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  }
}
