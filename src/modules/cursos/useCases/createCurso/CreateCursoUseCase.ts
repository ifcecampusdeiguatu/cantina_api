import { inject, injectable } from "tsyringe";

import { ICursosRepository } from "@modules/cursos/repositories/ICursosRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id?: string;
  name: string;
}

@injectable()
export class CreateCursoUseCase {
  constructor(
    @inject("CursosRepository")
    private cursosRepository: ICursosRepository
  ) {}

  async execute({ id, name }: IRequest) {
    const curso = await this.cursosRepository.findCursoByName(name);

    if (curso) {
      throw new AppError("Already a curso with the same name");
    }

    await this.cursosRepository.create({ id, name });
  }
}
