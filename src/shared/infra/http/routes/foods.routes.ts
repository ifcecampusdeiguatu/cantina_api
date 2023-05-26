import { Router } from "express";

import { AddIngredientToFoodController } from "@modules/menu/useCases/addIngredientToFood/AddIngredientToFoodController";
import { CreateFoodController } from "@modules/menu/useCases/createFood/CreateFoodController";

const createFoodController = new CreateFoodController();
const addIngredientToFoodController = new AddIngredientToFoodController();

const foodsRoutes = Router();

foodsRoutes.post("/", createFoodController.handle);
foodsRoutes.post("/:food/ingredients", addIngredientToFoodController.handle);

export { foodsRoutes };
