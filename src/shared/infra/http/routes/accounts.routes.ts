import { Router } from "express";
import multer from "multer";

import { CreateAlunosController } from "@modules/accounts/useCases/alunos/createAlunos/CreateAlunosController";
import { DeleteAlunoController } from "@modules/accounts/useCases/alunos/deleteAluno/DeleteAlunoController";
import { GetAlunosController } from "@modules/accounts/useCases/alunos/getAluno/GetAlunoController";
import { ImportAlunosController } from "@modules/accounts/useCases/alunos/importAlunos/ImportAlunoController";
import { ListAlunosController } from "@modules/accounts/useCases/alunos/listAlunos/ListAlunosController";
import { UpdateAlunoController } from "@modules/accounts/useCases/alunos/updateAluno/UpdateAlunoController";
import { CreateFuncionarioController } from "@modules/accounts/useCases/funcionarios/createFuncionario/CreateFuncionarioController";
import { CreateServidorController } from "@modules/accounts/useCases/servidores/createServidor/CreateServidorController";
import { CreateUserController } from "@modules/accounts/useCases/users/createUser/CreateUserController";
import { ListUsersController } from "@modules/accounts/useCases/users/listUsers/ListUsersController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureServidor } from "../middlewares/ensureServidor";

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

const createAlunosController = new CreateAlunosController();
const listAlunosController = new ListAlunosController();
const getAlunosController = new GetAlunosController();
const updateAlunoController = new UpdateAlunoController();
const deleteAlunoController = new DeleteAlunoController();
const importAlunosController = new ImportAlunosController();

const createFuncionarioController = new CreateFuncionarioController();

const createServidorController = new CreateServidorController();

const accountsRoutes = Router();

accountsRoutes.post("/users", createUserController.handle);
accountsRoutes.get("/users", listUsersController.handle);

/**
 * Todas as rotas a baixo devem ter autenticação e
 * usuário deve ser um funcionário.
 *
 * ensureAuthenticate -> verifica autenticação
 * ensureFuncionario -> verifica se usuário é um funcionário
 */
accountsRoutes.use(ensureAuthenticate, ensureServidor);

accountsRoutes.post("/alunos", createAlunosController.handle);
accountsRoutes.get("/alunos", listAlunosController.handle);
accountsRoutes.get("/alunos/:cpf", getAlunosController.handle);
accountsRoutes.put("/alunos/:cpf", updateAlunoController.handle);
accountsRoutes.delete("/alunos/:cpf", deleteAlunoController.handle);

const upload = multer({
  dest: "./tmp",
});

accountsRoutes.post(
  "/alunos/import",
  upload.single("file"),
  importAlunosController.handle
);

accountsRoutes.post("/funcionarios", createFuncionarioController.handle);

accountsRoutes.post("/servidores", createServidorController.handle);

export { accountsRoutes };
