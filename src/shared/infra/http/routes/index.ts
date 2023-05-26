import { Router } from "express";

import { alunosRoutes } from "./alunos.routes";
import { foodsRoutes } from "./foods.routes";
import { ingredientsRoutes } from "./ingredients.routes";

const router = Router();

router.use("/alunos", alunosRoutes);
router.use("/ingredients", ingredientsRoutes);
router.use("/foods", foodsRoutes);

export { router };
