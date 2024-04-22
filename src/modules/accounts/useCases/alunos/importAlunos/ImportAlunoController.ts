import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportAlunosUseCase } from "./ImportAlunosUseCase";

export class ImportAlunosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importAlunosUseCase = container.resolve(ImportAlunosUseCase);

    try {
      await importAlunosUseCase.execute(file);

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
