import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCoursesUseCase } from "./CreateCoursesUseCase";

export class CreateCoursesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, name } = request.body;

    const createCoursesUseCase = container.resolve(CreateCoursesUseCase);

    try {
      await createCoursesUseCase.execute({ id, name });

      return response.status(201).json();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
