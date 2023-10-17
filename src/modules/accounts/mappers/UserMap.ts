import { User } from "../infra/entities/User";

export type ParsedUser = {
  id: string;
  email: string;
  type: "aluno" | "funcionario" | "servidor";
  createdAt: Date;
  updatedAt: Date;
};

export class UsersMap {
  static toDTO(user: User) {
    const parsedUser: ParsedUser = {
      id: user.id,
      email: user.email,
      type: user.type,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return parsedUser;
  }
}
