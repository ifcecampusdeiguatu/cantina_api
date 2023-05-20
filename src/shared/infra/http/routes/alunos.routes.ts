import { Request, Response, Router } from "express";

import { CreateAlunosController } from "@modules/alunos/useCases/createAlunos/CreateAlunosController";

const createAlunosController = new CreateAlunosController();

const alunosRoutes = Router();

alunosRoutes.get("/", (request: Request, response: Response) => {
  return response.json({ message: "OK" });
});

alunosRoutes.post("", createAlunosController.handle);

export { alunosRoutes };
