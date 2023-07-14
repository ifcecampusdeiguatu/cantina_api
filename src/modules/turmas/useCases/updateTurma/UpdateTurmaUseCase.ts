import { inject, injectable } from "tsyringe";

import { ITurmasRepository } from "@modules/turmas/repositories/ITurmasRepository";
import { AppError } from "@shared/errors/AppError";

interface IUpdateTurmaDTO {
  id: string;
  name: string;
}

@injectable()
export class UpdateTurmaUseCase {
  constructor(
    @inject("TurmasRepository")
    private turmasRepository: ITurmasRepository
  ) {}

  async execute({ id, name }: IUpdateTurmaDTO): Promise<void> {
    const turma = await this.turmasRepository.findTurmaById(id);

    if (!turma) {
      throw new AppError("Turma não encontrado", 404);
    }

    await this.turmasRepository.update({ id, name });
  }
}
