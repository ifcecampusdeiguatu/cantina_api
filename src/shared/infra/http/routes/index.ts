import { Router } from "express";

import { alunosRoutes } from "./alunos.routes";
import { ingredientsRoutes } from "./ingredients.routes";

const router = Router();

router.use("/alunos", alunosRoutes);
router.use("/ingredients", ingredientsRoutes);

export { router };
