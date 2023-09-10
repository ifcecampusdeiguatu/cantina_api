import { Router } from "express";

import { CreateMenuController } from "@modules/meal/useCases/createMenu/CreateMenuController";

const createMenuController = new CreateMenuController();

const menuRoutes = Router();

menuRoutes.post("/", createMenuController.handle);

export { menuRoutes };
