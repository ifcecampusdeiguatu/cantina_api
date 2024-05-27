import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  user: {
    id: string;
    email?: string;
    type: "aluno" | "servidor" | "funcionario";
  };
}

export function verifyToken(
  token: string,
  secret_token: string
): {
  userId: string;
  user: {
    id: string;
    email?: string;
    type: "aluno" | "servidor" | "funcionario";
  };
} {
  try {
    const { sub: userId, user } = verify(token, secret_token) as IPayload;

    return { userId, user };
  } catch (err) {
    throw new AppError("Assinatura inválida", 401);
  }
}
