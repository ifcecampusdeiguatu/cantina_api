import { Request, Response, Router } from "express";

import { CreateMealController } from "@modules/meal/useCases/createMeal/CreateMealController";

const createMenuController = new CreateMealController();

const mealsRoutes = Router();

mealsRoutes.post("/", createMenuController.handle);
mealsRoutes.put("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Hello World!" });
});

export { mealsRoutes };
