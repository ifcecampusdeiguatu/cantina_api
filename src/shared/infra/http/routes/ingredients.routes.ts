import { Router } from "express";

import { CreateIngredientController } from "@modules/menu/useCases/createIngredient/CreateIngredientController";

const createIngredientController = new CreateIngredientController();

const ingredientsRoutes = Router();

ingredientsRoutes.post("/", createIngredientController.handle);

export { ingredientsRoutes };
