import { Aluno } from "@prisma/client";

import { ICreateAlunosDTO } from "../dtos/alunos/ICreateAlunosDTO";

export interface IAlunosRepository {
  create({
    matricula,
    name,
    turmaId,
    cursoId,
    userId,
  }: ICreateAlunosDTO): Promise<void>;
  findAlunoByMatricula(matricula: string): Promise<Aluno>;
}
