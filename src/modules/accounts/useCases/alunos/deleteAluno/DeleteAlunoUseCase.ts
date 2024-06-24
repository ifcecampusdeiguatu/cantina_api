import { inject, injectable } from "tsyringe";

import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";
import { AppError } from "@shared/errors/AppError";
import { IMatriculasRepository } from "@modules/accounts/repositories/IMatriculasRepository";

@injectable()
export class DeleteAlunoUseCase {
  constructor(
    @inject("AlunosRepository")
    private alunosRepository: IAlunosRepository,
    @inject("MatriculasRepository")
    private matriculaRepository: IMatriculasRepository
  ) {}

  async execute(cpf: string) {
    const aluno = await this.alunosRepository.findAlunoByCpf({cpf, matriculas: true});

    if (!aluno) {
      throw new AppError("Aluno não encontrado", 404);
    }

    await this.matriculaRepository.deleteAllRecordsByCpf(cpf);

    await this.alunosRepository.delete({ cpf });
  }
}
