import { Aluno } from "@prisma/client";

import { ICreateAlunosDTO } from "../dtos/alunos/ICreateAlunosDTO";
import { IUpdateAlunoDTO } from "../dtos/alunos/IUpdateAlunoDTO";

export interface IAlunosRepository {
  create({
    matricula,
    name,
    turmaId,
    cursoId,
    userId,
  }: ICreateAlunosDTO): Promise<void>;
  findAlunoByMatricula(matricula: string): Promise<Aluno>;
  list(): Promise<Aluno[]>;
  update({ matricula, name, cursoId, turmaId }: IUpdateAlunoDTO): Promise<void>;
  delete(matricula: string): Promise<void>;
}
