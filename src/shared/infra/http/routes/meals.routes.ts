import { Router } from "express";

import { CreateMealController } from "@modules/meal/useCases/createMeal/CreateMealController";

const createMenuController = new CreateMealController();

const mealsRoutes = Router();

mealsRoutes.post("/", createMenuController.handle);

export { mealsRoutes };
