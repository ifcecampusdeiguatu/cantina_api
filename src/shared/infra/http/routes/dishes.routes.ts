import { Router } from "express";

import { AddIngredientToDishController } from "@modules/meal/useCases/addIngredientToFood/AddIngredientToFoodController";
import { CreateDishController } from "@modules/meal/useCases/createDish/CreateDishController";

const createDishController = new CreateDishController();
const addIngredientToDishController = new AddIngredientToDishController();

const dishesRoutes = Router();

dishesRoutes.post("/", createDishController.handle);
dishesRoutes.post("/:dish/ingredients", addIngredientToDishController.handle);

export { dishesRoutes };
