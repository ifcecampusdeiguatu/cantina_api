import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetCheckinByCodeUseCase } from "./GetCheckinByCodeUseCase";

type Any = unknown;

interface IReqQuery {
  code: string;
}

interface IReqBody {
  code: string;
}

export class GetCheckinByCodeController {
  async handle(
    req: Request<Any, Any, IReqBody, IReqQuery>,
    res: Response
  ): Promise<Response> {
    const { code } = req.query || req.body;

    const getCheckinByCodeUseCase = container.resolve(GetCheckinByCodeUseCase);

    try {
      const checkin = await getCheckinByCodeUseCase.execute(code);

      return res.json(checkin);
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
