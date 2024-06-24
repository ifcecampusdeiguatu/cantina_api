import { inject, injectable } from "tsyringe";

import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";

@injectable()
export class ListAlunosUseCase {
  constructor(
    @inject("AlunosRepository")
    private alunosRepository: IAlunosRepository
  ) {}

  async execute() {
    try{
    const alunos = await this.alunosRepository.list({});

    return alunos;
    } catch (error) {
      console.log(error)
    }
  }
}
