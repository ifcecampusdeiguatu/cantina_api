import { inject, injectable } from "tsyringe";

import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteAlunoUseCase {
  constructor(
    @inject("AlunosRepository")
    private alunosRepository: IAlunosRepository
  ) {}

  async execute(matricula: string) {
    const aluno = await this.alunosRepository.findAlunoByMatricula(matricula);

    if (!aluno) {
      throw new AppError("Aluno não encontrado", 404);
    }

    await this.alunosRepository.delete(matricula);
  }
}
