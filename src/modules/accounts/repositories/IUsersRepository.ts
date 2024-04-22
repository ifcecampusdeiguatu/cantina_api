import { ICreateUserDTO } from "../dtos/users/ICreateUserDTO";
import { User } from "../infra/entities/User";
import { ParsedUser } from "../mappers/UserMap";

export interface IUsersRepository {
  create({ id, email, password, type }: ICreateUserDTO): Promise<void>;
  list(): Promise<ParsedUser[]>;
  findUserByEmail(email: string): Promise<User>;
  findUserById(id: string): Promise<User>;
  findUserByMatricula(matricula: string): Promise<User>;
}
