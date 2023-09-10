import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCheckinUseCase } from "./CreateCheckinUseCase";

export class CreateCheckinController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, status, mealId } = request.body;
    const { id: userId } = request.user;
    const { userId: userIdHeaders } = request.headers;

    const createCheckinUseCase = container.resolve(CreateCheckinUseCase);

    try {
      if (userIdHeaders && typeof userIdHeaders === "string") {
        await createCheckinUseCase.execute({
          id,
          status,
          mealId,
          userId: userIdHeaders,
        });
      }

      await createCheckinUseCase.execute({ id, status, mealId, userId });

      return response.status(201).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
