import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

interface ISessionResponse {
  token: string;
  user: {
    id: string;
    email: string;
    type: string;
  };
  refreshToken: string;
}

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { matricula, email, password } = request.body;

    if (!email && !matricula) {
      return response.status(400).json({ error: "Parâmetros insuficientes" });
    }

    if (email && matricula) {
      return response.status(400).json({ error: "Sobrecarga de parâmetros" });
    }

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    try {
      let session: ISessionResponse;

      if (email) {
        session = await authenticateUserUseCase.execute({
          email,
          password,
        });
      }

      if (matricula) {
        session = await authenticateUserUseCase.execute({
          matricula,
          password,
        });
      }

      return response.status(200).json(session);
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  }
}
