import { inject, injectable } from "tsyringe";

import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";
import { Aluno } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class GetAlunosUseCase {
  constructor(
    @inject("AlunosRepository")
    private alunosRepository: IAlunosRepository
  ) {}

  async execute({cpf, matriculas=true}: {cpf: string, matriculas: boolean}): Promise<Aluno> {
    const aluno = await this.alunosRepository.findAlunoByCpf({cpf, matriculas});

    if (!aluno) {
      throw new AppError("Aluno não encontrado", 404);
    }

    return aluno;
  }
}
