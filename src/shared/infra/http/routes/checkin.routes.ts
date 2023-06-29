import { Router } from "express";

import { CreateCheckinController } from "@modules/checkin/useCases/createCheckin/CreateCheckinController";

const createCheckinController = new CreateCheckinController();

const checkinRoutes = Router();

checkinRoutes.post("/", createCheckinController.handle);

export { checkinRoutes };
