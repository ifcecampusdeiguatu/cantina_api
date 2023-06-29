import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCheckinUseCase } from "./CreateCheckinUseCase";

export class CreateCheckinController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, status, menuId } = request.body;
    const { userid: userId } = request.headers;

    const createCheckinUseCase = container.resolve(CreateCheckinUseCase);

    try {
      if (typeof userId === "string") {
        await createCheckinUseCase.execute({ id, status, menuId, userId });
      }

      return response.status(201).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
