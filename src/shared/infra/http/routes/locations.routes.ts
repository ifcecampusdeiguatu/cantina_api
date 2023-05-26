import { Router } from "express";

import { CreateLocalController } from "@modules/locations/useCases/createLocal/CreateLocalController";

const createLocalController = new CreateLocalController();

const locationsRoutes = Router();

locationsRoutes.post("/", createLocalController.handle);

export { locationsRoutes };
