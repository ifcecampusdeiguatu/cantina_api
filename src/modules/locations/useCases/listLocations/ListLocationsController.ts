import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListLocationsUseCase } from "./ListLocationsUseCase";

export class ListLocationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listLocationsUseCase = container.resolve(ListLocationsUseCase);

    try {
      const locations = await listLocationsUseCase.execute();

      return response.json(locations);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
