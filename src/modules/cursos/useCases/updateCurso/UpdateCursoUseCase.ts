import { inject, injectable } from "tsyringe";

import { ICursosRepository } from "@modules/cursos/repositories/ICursosRepository";
import { AppError } from "@shared/errors/AppError";

interface IUpdateCursoDTO {
  id: string;
  name: string;
}

@injectable()
export class UpdateCursoUseCase {
  constructor(
    @inject("CursosRepository")
    private cursosRepository: ICursosRepository
  ) {}

  async execute({ id, name }: IUpdateCursoDTO): Promise<void> {
    const curso = await this.cursosRepository.findCursoById(id);

    if (!curso) {
      throw new AppError("Curso não encontrado", 404);
    }

    await this.cursosRepository.update({ id, name });
  }
}
