import { inject, injectable } from "tsyringe";

import { ICursosRepository } from "@modules/cursos/repositories/ICursosRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteCursoUseCase {
  constructor(
    @inject("CursosRepository")
    private cursosRepository: ICursosRepository
  ) {}

  async execute(id: string) {
    const curso = await this.cursosRepository.findCursoById(id);

    if (!curso) {
      throw new AppError("Curso não encontrado", 404);
    }

    await this.cursosRepository.delete(id);
  }
}
