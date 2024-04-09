import bcrypt from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
  type?: "aluno" | "funcionario" | "servidor";
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute(data: IRequest) {
    const user = await this.userRepository.findUserByEmail(data.email);

    if (user) {
      throw new AppError("User already exists");
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    const hashPassword = await bcrypt.hash(data.password, salt);

    await this.userRepository.create({ ...data, password: hashPassword });
  }
}
