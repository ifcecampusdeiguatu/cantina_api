import { Router } from "express";

import { CreateAlunosController } from "@modules/accounts/useCases/alunos/createAlunos/CreateAlunosController";
import { DeleteAlunoController } from "@modules/accounts/useCases/alunos/deleteAluno/DeleteAlunoController";
import { GetAlunosController } from "@modules/accounts/useCases/alunos/getAluno/GetAlunoController";
import { ListAlunosController } from "@modules/accounts/useCases/alunos/listAlunos/ListAlunosController";
import { UpdateAlunoController } from "@modules/accounts/useCases/alunos/updateAluno/UpdateAlunoController";
import { CreateFuncionarioController } from "@modules/accounts/useCases/funcionarios/createFuncionario/CreateFuncionarioController";
import { CreateServidorController } from "@modules/accounts/useCases/servidores/createServidor/CreateServidorController";
import { CreateUserController } from "@modules/accounts/useCases/users/createUser/CreateUserController";
import { ListUsersController } from "@modules/accounts/useCases/users/listUsers/ListUsersController";

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

const createAlunosController = new CreateAlunosController();
const listAlunosController = new ListAlunosController();
const getAlunosController = new GetAlunosController();
const updateAlunoController = new UpdateAlunoController();
const deleteAlunoController = new DeleteAlunoController();

const createFuncionarioController = new CreateFuncionarioController();

const createServidorController = new CreateServidorController();

const accountsRoutes = Router();

accountsRoutes.post("/users", createUserController.handle);
accountsRoutes.get("/users", listUsersController.handle);

accountsRoutes.post("/alunos", createAlunosController.handle);
accountsRoutes.get("/alunos", listAlunosController.handle);
accountsRoutes.get("/alunos/:matricula", getAlunosController.handle);
accountsRoutes.put("/alunos/:matricula", updateAlunoController.handle);
accountsRoutes.delete("/alunos/:matricula", deleteAlunoController.handle);

accountsRoutes.post("/funcionarios", createFuncionarioController.handle);

accountsRoutes.post("/servidores", createServidorController.handle);

export { accountsRoutes };
