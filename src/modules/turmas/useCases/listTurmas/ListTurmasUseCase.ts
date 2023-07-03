import { inject, injectable } from "tsyringe";

import { ITurmasRepository } from "@modules/turmas/repositories/ITurmasRepository";
import { Turma } from "@prisma/client";

@injectable()
export class ListTurmasUseCase {
  constructor(
    @inject("TurmasRepository")
    private turmasRepository: ITurmasRepository
  ) {}

  async execute(): Promise<Turma[]> {
    const turmas = await this.turmasRepository.list();

    return turmas;
  }
}
