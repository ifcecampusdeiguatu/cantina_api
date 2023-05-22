import { Aluno } from "@prisma/client";

import { ICreateAlunosDTO } from "../dtos/ICreateAlunosDTO";

export interface IAlunosRepository {
  create({ matricula, name, turma, curso }: ICreateAlunosDTO): Promise<Aluno>;
  findAlunoByMatricula(matricula: string): Promise<Aluno>;
}