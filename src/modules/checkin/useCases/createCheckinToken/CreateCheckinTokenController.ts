import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCheckinTokenUseCase } from "./CreateCheckinTokenUseCase";

export class CreateCheckinTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { checkinId } = req.body;

    const createCheckinTokenUseCase = container.resolve(CreateCheckinTokenUseCase);

    try {
      await createCheckinTokenUseCase.execute(checkinId);

      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({error: err.message});
    }
  }
}