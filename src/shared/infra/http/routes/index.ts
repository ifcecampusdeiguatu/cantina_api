import { Router } from "express";

import { accountsRoutes } from "./accounts.routes";
import { checkinRoutes } from "./checkin.routes";
import { cursosRoutes } from "./cursos.routes";
import { foodsRoutes } from "./foods.routes";
import { ingredientsRoutes } from "./ingredients.routes";
import { locationsRoutes } from "./locations.routes";
import { menuRoutes } from "./menu.routes";
import { turmasRoutes } from "./turmas.routes";

const router = Router();

router.use("/accounts", accountsRoutes);
router.use("/ingredients", ingredientsRoutes);
router.use("/foods", foodsRoutes);
router.use("/locations", locationsRoutes);
router.use("/menu", menuRoutes);
router.use("/checkin", checkinRoutes);
router.use("/cursos", cursosRoutes);
router.use("/turmas", turmasRoutes);

export { router };
