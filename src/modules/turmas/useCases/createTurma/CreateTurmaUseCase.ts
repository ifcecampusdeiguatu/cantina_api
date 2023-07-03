import { inject, injectable } from "tsyringe";

import { ITurmasRepository } from "@modules/turmas/repositories/ITurmasRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id?: string;
  name: string;
}

@injectable()
export class CreateTurmasUseCase {
  constructor(
    @inject("TurmasRepository")
    private turmasRepository: ITurmasRepository
  ) {}

  async execute({ id, name }: IRequest) {
    const course = await this.turmasRepository.findTurmaByName(name);

    if (course) {
      throw new AppError("Already a turma with the same name");
    }

    await this.turmasRepository.create({ id, name });
  }
}
