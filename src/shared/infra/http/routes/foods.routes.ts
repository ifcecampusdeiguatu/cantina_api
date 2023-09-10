import { Router } from "express";

import { AddIngredientToFoodController } from "@modules/meal/useCases/addIngredientToFood/AddIngredientToFoodController";
import { CreateFoodController } from "@modules/meal/useCases/createFood/CreateFoodController";

const createFoodController = new CreateFoodController();
const addIngredientToFoodController = new AddIngredientToFoodController();

const foodsRoutes = Router();

foodsRoutes.post("/", createFoodController.handle);
foodsRoutes.post("/:food/ingredients", addIngredientToFoodController.handle);

export { foodsRoutes };
