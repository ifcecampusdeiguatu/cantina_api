import { ICreateUserDTO } from "@modules/accounts/dtos/users/ICreateUserDTO";
import { User } from "@modules/accounts/infra/entities/User";
import { ParsedUser, UsersMap } from "@modules/accounts/mappers/UserMap";

import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ email, password, type }: ICreateUserDTO): Promise<void> {
    const user = Object() as User;

    Object.assign(user, { email, password, type });

    this.users.push(user);
  }

  async list(): Promise<ParsedUser[]> {
    return this.users.map((user) => UsersMap.toDTO(user));
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async findUserById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
  async findUserByMatricula(matricula: string): Promise<User> {
    const user = this.users.find((user) =>
      user.alunos.some((aluno) => aluno.matricula === matricula)
    );

    return user;
  }
}
