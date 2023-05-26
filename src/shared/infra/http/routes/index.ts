import { Router } from "express";

import { alunosRoutes } from "./alunos.routes";
import { foodsRoutes } from "./foods.routes";
import { ingredientsRoutes } from "./ingredients.routes";
import { locationsRoutes } from "./locations.routes";

const router = Router();

router.use("/alunos", alunosRoutes);
router.use("/ingredients", ingredientsRoutes);
router.use("/foods", foodsRoutes);
router.use("/locations", locationsRoutes);

export { router };
