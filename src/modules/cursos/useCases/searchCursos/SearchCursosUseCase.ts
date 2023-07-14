import { inject, injectable } from "tsyringe";

import { ICursosRepository } from "@modules/cursos/repositories/ICursosRepository";
import { Curso } from "@prisma/client";

@injectable()
export class SearchCursosUseCase {
  constructor(
    @inject("CursosRepository")
    private cursosRepository: ICursosRepository
  ) {}

  async execute(name: string): Promise<Curso[]> {
    const cursos = await this.cursosRepository.searchCursosByName(name);

    return cursos;
  }
}
