import { Router } from "express";

import { CreateAlunosController } from "@modules/accounts/useCases/alunos/createAlunos/CreateAlunosController";
import { CreateUserController } from "@modules/accounts/useCases/users/createUser/CreateUserController";
import { ListUsersController } from "@modules/accounts/useCases/users/listUsers/ListUsersController";

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const createAlunosController = new CreateAlunosController();

const accountsRoutes = Router();

accountsRoutes.post("/users", createUserController.handle);
accountsRoutes.get("/users", listUsersController.handle);

accountsRoutes.post("/alunos", createAlunosController.handle);

export { accountsRoutes };
