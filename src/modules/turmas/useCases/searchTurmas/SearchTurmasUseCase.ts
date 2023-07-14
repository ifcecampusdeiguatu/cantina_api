import { inject, injectable } from "tsyringe";

import { ITurmasRepository } from "@modules/turmas/repositories/ITurmasRepository";
import { Turma } from "@prisma/client";

@injectable()
export class SearchTurmasUseCase {
  constructor(
    @inject("TurmasRepository")
    private turmasRepository: ITurmasRepository
  ) {}

  async execute(name: string): Promise<Turma[]> {
    const turmas = await this.turmasRepository.searchTurmasByName(name);

    return turmas;
  }
}
