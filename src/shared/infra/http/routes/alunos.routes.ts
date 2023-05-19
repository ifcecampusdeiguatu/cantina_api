import { Request, Response, Router } from "express";

const alunosRoutes = Router();

alunosRoutes.get("/", (request: Request, response: Response) => {
  return response.json({ message: "OK" });
});

export { alunosRoutes };
