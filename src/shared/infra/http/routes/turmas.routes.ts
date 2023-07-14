import { Router } from "express";

import { CreateTurmaController } from "@modules/turmas/useCases/createTurma/CreateTurmaController";
import { DeleteTurmaController } from "@modules/turmas/useCases/deleteTurma/DeleteTurmaController";
import { FindTurmaController } from "@modules/turmas/useCases/findTurma/FindTurmaController";
import { ListTurmasController } from "@modules/turmas/useCases/listTurmas/ListTurmasController";
import { SearchTurmaController } from "@modules/turmas/useCases/searchTurmas/SearchTurmasController";
import { UpdateTurmaController } from "@modules/turmas/useCases/updateTurma/UpdateTurmaController";

const createTurmaController = new CreateTurmaController();
const listTurmasController = new ListTurmasController();
const findTurmaController = new FindTurmaController();
const searchTurmasController = new SearchTurmaController();
const deleteTurmaController = new DeleteTurmaController();
const updateTurmaController = new UpdateTurmaController();

const turmasRoutes = Router();

turmasRoutes.post("/", createTurmaController.handle);
turmasRoutes.get("/", listTurmasController.handle);
turmasRoutes.get("/search", searchTurmasController.handle);
turmasRoutes.get("/:id", findTurmaController.handle);
turmasRoutes.delete("/:id", deleteTurmaController.handle);
turmasRoutes.put("/:id", updateTurmaController.handle);

export { turmasRoutes };
