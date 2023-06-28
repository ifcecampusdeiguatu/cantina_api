import { inject, injectable } from "tsyringe";

import { ParsedUser } from "@modules/accounts/mappers/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute(): Promise<ParsedUser[]> {
    const users = await this.userRepository.list();

    return users;
  }
}
