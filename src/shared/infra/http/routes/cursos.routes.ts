import { Router } from "express";

import { CreateCursoController } from "@modules/cursos/useCases/createCurso/CreateCursoController";
import { DeleteCursoController } from "@modules/cursos/useCases/deleteCurso/DeleteCursoController";
import { FindCursoController } from "@modules/cursos/useCases/findCurso/FindCursoController";
import { ListCursosController } from "@modules/cursos/useCases/listCursos/ListCursosController";
import { SearchCursoController } from "@modules/cursos/useCases/searchCursos/SearchCursosController";
import { UpdateCursoController } from "@modules/cursos/useCases/updateCurso/UpdateCursoController";

const createCursoController = new CreateCursoController();
const listCursosController = new ListCursosController();
const findCursoController = new FindCursoController();
const searchCursosController = new SearchCursoController();
const deleteCursoController = new DeleteCursoController();
const updateCursoController = new UpdateCursoController();

const cursosRoutes = Router();

cursosRoutes.post("/", createCursoController.handle);
cursosRoutes.get("/", listCursosController.handle);
cursosRoutes.get("/search", searchCursosController.handle);
cursosRoutes.get("/:id", findCursoController.handle);
cursosRoutes.delete("/:id", deleteCursoController.handle);
cursosRoutes.put("/:id", updateCursoController.handle);

export { cursosRoutes };
