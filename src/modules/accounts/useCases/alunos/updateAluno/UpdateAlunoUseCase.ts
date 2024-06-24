import { inject, injectable } from "tsyringe";

import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";
import { AppError } from "@shared/errors/AppError";

export interface IRequest {
  cpf: string;
  nome?: string;
  cidade?: string;
  sexo?: string;
}

@injectable()
export class UpdateAlunoUseCase {
  constructor(
    @inject("AlunosRepository")
    private alunosRepository: IAlunosRepository
  ) {}

  async execute({ cpf, nome, cidade, sexo }: IRequest) {
    const aluno = await this.alunosRepository.findAlunoByCpf({ cpf, matriculas: false });

    if (!aluno) {
      throw new AppError("Aluno não encontrado", 404);
    }

    const sexValidation = ["M", "F"].includes(sexo.toUpperCase());

    if (!sexValidation) {
      throw new AppError("Argumento inválido", 422);
    }

    await this.alunosRepository.update({ cpf, nome, cidade, sexo });
  }
}
