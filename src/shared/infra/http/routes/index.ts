import { Router } from "express";

import { accountsRoutes } from "./accounts.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { checkinRoutes } from "./checkin.routes";
import { cursosRoutes } from "./cursos.routes";
import { dishesRoutes } from "./dishes.routes";
import { ingredientsRoutes } from "./ingredients.routes";
import { locationsRoutes } from "./locations.routes";
import { menuRoutes } from "./menu.routes";
import { turmasRoutes } from "./turmas.routes";

const router = Router();

router.use("/accounts", accountsRoutes);
router.use("/ingredients", ingredientsRoutes);
router.use("/dishes", dishesRoutes);
router.use("/locations", locationsRoutes);
router.use("/menu", menuRoutes);
router.use("/checkin", checkinRoutes);
router.use("/cursos", cursosRoutes);
router.use("/turmas", turmasRoutes);

router.use(authenticateRoutes);

export { router };
