import { inject, injectable } from "tsyringe";

import { ITurmasRepository } from "@modules/turmas/repositories/ITurmasRepository";
import { Turma } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class FindTurmaUseCase {
  constructor(
    @inject("TurmasRepository")
    private turmasRepository: ITurmasRepository
  ) {}

  async execute(id: string): Promise<Turma> {
    const turma = await this.turmasRepository.findTurmaById(id);

    if (!turma) {
      throw new AppError("Turma não encontrado", 404);
    }

    return turma;
  }
}
