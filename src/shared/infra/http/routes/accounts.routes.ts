import { Router } from "express";

import { CreateAlunosController } from "@modules/accounts/useCases/alunos/createAlunos/CreateAlunosController";
import { CreateFuncionarioController } from "@modules/accounts/useCases/funcionarios/createFuncionario/CreateFuncionarioController";
import { CreateServidorController } from "@modules/accounts/useCases/servidores/createServidor/CreateServidorController";
import { CreateUserController } from "@modules/accounts/useCases/users/createUser/CreateUserController";
import { ListUsersController } from "@modules/accounts/useCases/users/listUsers/ListUsersController";

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const createAlunosController = new CreateAlunosController();
const createFuncionarioController = new CreateFuncionarioController();
const createServidorController = new CreateServidorController();

const accountsRoutes = Router();

accountsRoutes.post("/users", createUserController.handle);
accountsRoutes.get("/users", listUsersController.handle);

accountsRoutes.post("/alunos", createAlunosController.handle);

accountsRoutes.post("/funcionarios", createFuncionarioController.handle);

accountsRoutes.post("/servidores", createServidorController.handle);

export { accountsRoutes };
