import { ICreateAlunosDTO } from "../dtos/alunos/ICreateAlunosDTO";
import { IUpdateAlunoDTO } from "../dtos/alunos/IUpdateAlunoDTO";
import { Aluno } from "../infra/entities/Aluno";

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
