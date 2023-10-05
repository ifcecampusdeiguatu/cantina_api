import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateStatusUseCase } from "./UpdateStatusUseCase";
import { Status } from "@prisma/client";

interface ReqQuery {
  status: Status;
}

interface ReqParams {
  id: string;
}

export class UpdateStatusController {
  async handle(req: Request<ReqParams, any, any, ReqQuery>, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status } = req.query;
    const { id: userId, type} = req.user;

    const updateStatusUseCase = container.resolve(UpdateStatusUseCase);

    try {
      await updateStatusUseCase.execute({id, status, user: {id, type}});

      return res.status(204).send();
    } catch (err) {
      return res.status(err.statusCode).json({error: err.message});
    }
  }
}