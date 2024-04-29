import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCheckinCodeUseCase } from "./CreateCheckinCodeUseCase";

export class CreateCheckinCodeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: checkinId } = req.body;

    const createCheckinCodeUseCase = container.resolve(CreateCheckinCodeUseCase);

    try {
      const code = await createCheckinCodeUseCase.execute({checkinId});

      return res.status(204).json({code})
    }catch (err) {
      (err);
      return res.status(err.statusCode).json({err: err.message});
    }
  }
}