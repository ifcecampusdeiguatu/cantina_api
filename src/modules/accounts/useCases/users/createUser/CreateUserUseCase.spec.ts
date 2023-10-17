import "reflect-metadata";

import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: IUsersRepository;

describe("Create a User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be possible create a user", async () => {
    const data = {
      email: "user@example.com",
      password: "userpass",
    };

    await createUserUseCase.execute({
      email: data.email,
      password: data.password,
    });

    const users = await usersRepositoryInMemory.list();

    expect(users[0]).toHaveProperty("id");
  });

  it("should not be possible to create a user with the same email", async () => {
    const data = {
      email: "user@example.com",
      password: "userpass",
    };

    await createUserUseCase.execute({ ...data });

    await expect(createUserUseCase.execute({ ...data })).rejects.toEqual(
      new AppError("User already exists")
    );
  });
});
