import { inject, injectable } from "tsyringe";

import { ICursosRepository } from "@modules/cursos/repositories/ICursosRepository";
import { Curso } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class FindCursoUseCase {
  constructor(
    @inject("CursosRepository")
    private cursosRepository: ICursosRepository
  ) {}

  async execute(id: string): Promise<Curso> {
    const curso = await this.cursosRepository.findCursoById(id);

    if (!curso) {
      throw new AppError("Curso não encontrado", 404);
    }

    return curso;
  }
}
