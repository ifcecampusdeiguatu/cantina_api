import { inject, injectable } from "tsyringe";

import { IFuncionariosRepository } from "@modules/accounts/repositories/IFuncionariosRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUser } from "@modules/accounts/types";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  role: string;
  userId: string;
}

@injectable()
export class CreateFuncionarioUseCase {
  constructor(
    @inject("FuncionariosRepository")
    private funcionariosRepository: IFuncionariosRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, role, userId }: IRequest): Promise<void> {
    const user: IUser = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User not exist");
    }

    if (user.type !== "funcionario") {
      throw new AppError("User isn't a funcionario");
    }

    if (user.funcionario) {
      throw new AppError("User already associated with account");
    }

    await this.funcionariosRepository.create({ name, role, userId });
  }
}
