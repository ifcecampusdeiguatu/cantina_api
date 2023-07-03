import { User } from "@prisma/client";

import { ICreateUserDTO } from "../dtos/users/ICreateUserDTO";
import { ParsedUser } from "../mappers/UserMap";

export interface IUsersRepository {
  create({ email, password, type }: ICreateUserDTO): Promise<void>;
  list(): Promise<ParsedUser[]>;
  findUserByEmail(email: string): Promise<User>;
  findUserById(id: string): Promise<User>;
}
