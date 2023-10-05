import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCheckinTokenUseCase } from "./GetCheckinTokenUseCase";

export class GetCheckinTokenController {
  async handle(req: Request, res: Response): Promise<Response>{
    const { id: checkinId } = req.params;

    const getCheckinTokenUseCase = container.resolve(GetCheckinTokenUseCase);

    try {
      const checkinToken = await getCheckinTokenUseCase.execute(checkinId);

      return res.status(200).json(checkinToken);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}