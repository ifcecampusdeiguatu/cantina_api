import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";

import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/prisma/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticate(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  const usersTokensRepository = container.resolve(UsersTokensRepository);

  if (!authHeader) {
    throw new AppError("Token faltando");
  }

  const token = authHeader.split(" ")[1];

  try {
    const { sub: userId } = verify(token, auth.secret_token) as IPayload;

    const userToken = await usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("Token inválido", 401);
    }

    request.user = {
      id: userId,
    };

    next();
  } catch {
    throw new AppError("Token inválido", 401);
  }

  return null;
}
