import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/prisma/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureFuncionario(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = container.resolve(UsersRepository);

  const user = await usersRepository.findUserById(id);

  if (user && user.type !== "funcionario") {
    throw new AppError("Usuário não tem permissão", 401);
  }

  return next();
}
