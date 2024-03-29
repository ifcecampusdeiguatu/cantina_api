import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/users/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/users/refreshToken/RefreshTokenController";

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
