import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  user: {
    email: string;
    type: "aluno" | "servidor" | "funcionario";
    matricula?: string;
  };
}

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

  try {
    const { sub: userId, user } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      id: userId,
      type: user.type,
    };

    next();
  } catch (err) {
    throw new AppError("Token inválido", 401);
  }

  return null;
}
