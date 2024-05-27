import { NextFunction, Request, Response } from "express";

import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { verifyToken } from "@utils/verifyToken";

export async function ensureAuthenticate(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token faltando", 401);
  }

  const token = authHeader.split(" ")[1];

  const { userId, user } = verifyToken(token, auth.secret_token);

  request.user = {
    id: userId,
    type: user.type,
  };

  next();

  return null;
}
