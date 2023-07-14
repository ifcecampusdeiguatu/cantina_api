import { inject, injectable } from "tsyringe";

import { ITurmasRepository } from "@modules/turmas/repositories/ITurmasRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteTurmaUseCase {
  constructor(
    @inject("TurmasRepository")
    private turmasRepository: ITurmasRepository
  ) {}

  async execute(id: string) {
    const turma = await this.turmasRepository.findTurmaById(id);

    if (!turma) {
      throw new AppError("Turma não encontrado", 404);
    }

    await this.turmasRepository.delete(id);
  }
}
