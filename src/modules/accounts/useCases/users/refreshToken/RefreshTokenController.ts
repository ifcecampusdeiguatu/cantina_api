import { Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

export class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const refreshToken =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    try {
      const tokens = await refreshTokenUseCase.execute(refreshToken);

      return response.json(tokens);
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        return response.status(400).json({ error: "JWT expired" });
      }

      return response.status(err.statusCode).json({ error: err.message });
    }
  }
}
