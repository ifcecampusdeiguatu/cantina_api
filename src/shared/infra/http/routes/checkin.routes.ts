import { Router } from "express";

import { CreateCheckinController } from "@modules/checkin/useCases/createCheckin/CreateCheckinController";
import { CreateCheckinCodeController } from "@modules/checkin/useCases/createCheckinCode/CreateCheckinCodeController";
import { CreateCheckinTokenController } from "@modules/checkin/useCases/createCheckinToken/CreateCheckinTokenController";
import { GetCheckinByCodeController } from "@modules/checkin/useCases/getCheckinByCode/GetCheckinByCodeController";
import { GetCheckinTokenController } from "@modules/checkin/useCases/getCheckinToken/GetCheckinTokenController";
import { ListCheckinsController } from "@modules/checkin/useCases/listCheckins/ListCheckinsController";
import { UpdateStatusController } from "@modules/checkin/useCases/updateStatus/UpdateStatusController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const createCheckinController = new CreateCheckinController();
const listCheckinsController = new ListCheckinsController();
const createCheckinTokenController = new CreateCheckinTokenController();
const getCheckinTokenController = new GetCheckinTokenController();
const updateStatusController = new UpdateStatusController();
const getCheckinByCodeController = new GetCheckinByCodeController();
const createCheckinCodeController = new CreateCheckinCodeController();

const checkinRoutes = Router();

checkinRoutes.use(ensureAuthenticate);

checkinRoutes.post("/", createCheckinController.handle);
checkinRoutes.get("/", listCheckinsController.handle);
checkinRoutes.put("/:id", updateStatusController.handle);

checkinRoutes.post("/token", createCheckinTokenController.handle);
checkinRoutes.get("/token/:id", getCheckinTokenController.handle);

checkinRoutes.get("/verify", getCheckinByCodeController.handle);
checkinRoutes.post("/verify", createCheckinCodeController.handle);

export { checkinRoutes };
