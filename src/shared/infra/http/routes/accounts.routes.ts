import { Router } from "express";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "@modules/accounts/useCases/listUsers/ListUsersController";

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

const accountsRoutes = Router();

accountsRoutes.post("/users", createUserController.handle);
accountsRoutes.get("/users", listUsersController.handle);

export { accountsRoutes };
