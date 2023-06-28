import { inject, injectable } from "tsyringe";

import { ICreateAlunosDTO } from "@modules/alunos/dtos/ICreateAlunosDTO";
import { IAlunosRepository } from "@modules/alunos/repositories/IAlunosRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateAlunosUseCase {
  constructor(
    @inject("AlunosRepository")
    private alunosRepository: IAlunosRepository
  ) {}

  async execute({
    matricula,
    name,
    turma,
    curso,
    userId,
  }: ICreateAlunosDTO): Promise<void> {
    const alunoAlreadyExists = await this.alunosRepository.findAlunoByMatricula(
      matricula
    );

    if (alunoAlreadyExists) {
      throw new AppError("Aluno já foi cadastrado");
    }

    await this.alunosRepository.create({
      matricula,
      name,
      turma,
      curso,
      userId,
    });
  }
}
