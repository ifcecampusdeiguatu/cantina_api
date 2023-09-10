import { Router } from "express";

import { CreateCheckinController } from "@modules/checkin/useCases/createCheckin/CreateCheckinController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const createCheckinController = new CreateCheckinController();

const checkinRoutes = Router();

checkinRoutes.use(ensureAuthenticate);

checkinRoutes.post("/", createCheckinController.handle);

export { checkinRoutes };
