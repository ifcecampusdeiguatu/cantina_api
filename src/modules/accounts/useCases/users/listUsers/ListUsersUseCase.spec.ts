import "reflect-metadata";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ListUsersUseCase } from "./ListUsersUseCase";

let createUserUseCase: CreateUserUseCase;
let listUsersUseCase: ListUsersUseCase;
let usersRepositoryInMemory: IUsersRepository;

describe("List Users", () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
  });

  it("should be possible to list all users", async () => {
    await createUserUseCase.execute({
      email: "user_01@example.com",
      password: "userpass",
    });

    await createUserUseCase.execute({
      email: "user_02@example.com",
      password: "userpass",
    });

    const users = await listUsersUseCase.execute();

    expect(users).toHaveLength(2);
  });
});
