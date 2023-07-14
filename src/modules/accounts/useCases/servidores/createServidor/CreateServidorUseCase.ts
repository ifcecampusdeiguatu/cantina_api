import { inject, injectable } from "tsyringe";

import { IServidoresRepository } from "@modules/accounts/repositories/IServidoresRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUser } from "@modules/accounts/types";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  siape: string;
  name: string;
  role: string;
  userId: string;
}

@injectable()
export class CreateServidorUseCase {
  constructor(
    @inject("ServidoresRepository")
    private servidoresRepository: IServidoresRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ siape, name, role, userId }: IRequest) {
    const servidor = await this.servidoresRepository.findServidorBySIAPE(siape);

    if (servidor) {
      throw new AppError("Servidor already exists");
    }

    const user: IUser = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User not exist");
    }

    if (user.type !== "servidor") {
      throw new AppError("User isn't a servidor");
    }

    if (user.servidor) {
      throw new AppError("User already associated with account");
    }

    await this.servidoresRepository.create({ siape, name, role, userId });
  }
}
