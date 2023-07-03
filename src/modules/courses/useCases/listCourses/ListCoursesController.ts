import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCoursesUseCase } from "./ListCoursesUseCase";

export class ListCoursesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCoursesUseCase = container.resolve(ListCoursesUseCase);

    try {
      const courses = await listCoursesUseCase.execute();

      return response.json(courses);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
