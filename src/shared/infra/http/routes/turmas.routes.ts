import { Router } from "express";

import { CreateTurmaController } from "@modules/turmas/useCases/createTurma/CreateTurmaController";
import { ListTurmasController } from "@modules/turmas/useCases/listTurmas/ListTurmasController";

const createTurmaController = new CreateTurmaController();
const listTurmasController = new ListTurmasController();

const turmasRoutes = Router();

turmasRoutes.post("/", createTurmaController.handle);
turmasRoutes.get("/", listTurmasController.handle);

export { turmasRoutes };
