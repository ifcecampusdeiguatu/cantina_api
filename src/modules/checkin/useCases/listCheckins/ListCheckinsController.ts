import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCheckinsUseCase } from "./ListCheckinsUseCase";

export class ListCheckinsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCheckinsUseCase = container.resolve(ListCheckinsUseCase);

    try {
      const checkins = await listCheckinsUseCase.execute();

      return res.status(200).json(checkins);
    } catch (err) {
      return res.status(err.code).json({
        error: err.message,
      });
    }
  }
}
