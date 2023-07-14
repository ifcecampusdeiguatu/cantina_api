import { inject, injectable } from "tsyringe";

import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";
import { AppError } from "@shared/errors/AppError";

export interface IRequest {
  matricula: string;
  name?: string;
  turmaId?: string;
  cursoId?: string;
}

@injectable()
export class UpdateAlunoUseCase {
  constructor(
    @inject("AlunosRepository")
    private alunosRepository: IAlunosRepository
  ) {}

  async execute({ matricula, name, cursoId, turmaId }: IRequest) {
    const aluno = await this.alunosRepository.findAlunoByMatricula(matricula);

    if (!aluno) {
      throw new AppError("Aluno não encontrado", 404);
    }

    await this.alunosRepository.update({ matricula, name, cursoId, turmaId });
  }
}
