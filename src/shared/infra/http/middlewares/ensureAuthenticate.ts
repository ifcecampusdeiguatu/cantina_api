import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/prisma/repositories/UsersTokensRepository";
import { PrismaService } from "@shared/container/services/prisma/PrismaService";
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

  const usersTokensRepository = new UsersTokensRepository(new PrismaService());

  if (!authHeader) {
    throw new AppError("Token faltando");
  }

  const token = authHeader.split(" ")[1];

  try {
    const userToken = await usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("Token inválido", 401);
    }

    const { sub: userId } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      id: userId,
    };

    next();
  } catch {
    throw new AppError("Token inválido", 401);
  }

  return null;
}
