import { Router } from "express";

import { CreateMenuController } from "@modules/menu/useCases/createMenu/CreateMenuController";

const createMenuController = new CreateMenuController();

const menuRoutes = Router();

menuRoutes.post("/", createMenuController.handle);

export { menuRoutes };
