import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateLocalUseCase } from "./CreateLocalUseCase";

export class CreateLocalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { address } = request.body;

    const createLocalUseCase = container.resolve(CreateLocalUseCase);

    try {
      const local = await createLocalUseCase.execute({ address });

      return response.status(201).json({ ...local });
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
