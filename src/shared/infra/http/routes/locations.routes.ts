import { Router } from "express";

import { CreateLocalController } from "@modules/locations/useCases/createLocal/CreateLocalController";
import { ListLocationsController } from "@modules/locations/useCases/listLocations/ListLocationsController";

const createLocalController = new CreateLocalController();
const listLocationsController = new ListLocationsController();

const locationsRoutes = Router();

locationsRoutes.post("/", createLocalController.handle);
locationsRoutes.get("/", listLocationsController.handle);

export { locationsRoutes };
