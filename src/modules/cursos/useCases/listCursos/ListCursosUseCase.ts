import { inject, injectable } from "tsyringe";

import { ICursosRepository } from "@modules/cursos/repositories/ICursosRepository";
import { Curso } from "@prisma/client";

@injectable()
export class ListCursosUseCase {
  constructor(
    @inject("CursosRepository")
    private cursosRepository: ICursosRepository
  ) {}

  async execute(): Promise<Curso[]> {
    const cursos = await this.cursosRepository.list();

    return cursos;
  }
}
