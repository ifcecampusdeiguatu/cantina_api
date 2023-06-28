import { Router } from "express";

import { accountsRoutes } from "./accounts.routes";
import { alunosRoutes } from "./alunos.routes";
import { foodsRoutes } from "./foods.routes";
import { ingredientsRoutes } from "./ingredients.routes";
import { locationsRoutes } from "./locations.routes";
import { menuRoutes } from "./menu.routes";

const router = Router();

router.use("/alunos", alunosRoutes);
router.use("/accounts", accountsRoutes);
router.use("/ingredients", ingredientsRoutes);
router.use("/foods", foodsRoutes);
router.use("/locations", locationsRoutes);
router.use("/menu", menuRoutes);

export { router };
