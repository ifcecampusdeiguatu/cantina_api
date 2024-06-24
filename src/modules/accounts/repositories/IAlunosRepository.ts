import { ICreateAlunosDTO } from "../dtos/alunos/ICreateAlunosDTO";
import { IDeleteAlunoDTO } from "../dtos/alunos/IDeleteAlunoDTO";
import { IUpdateAlunoDTO } from "../dtos/alunos/IUpdateAlunoDTO";
import { Aluno } from "../infra/entities/Aluno";

export interface IAlunosRepository {
  create({ userId, cpf, nome, sexo, cidade }: ICreateAlunosDTO): Promise<Aluno>;
  findAlunoByMatricula(matricula: string): Promise<Aluno>;
  findAlunoByCpf({cpf, matriculas}: {cpf: string, matriculas: boolean}): Promise<Aluno>;
  findAlunoByUserId(cpf: string): Promise<Aluno>;
  list({order, limit, matriculas}:{order?: "asc" | "desc", limit?: number, matriculas?: boolean}): Promise<Aluno[]>;
  update({ cpf, cidade, nome, sexo }: IUpdateAlunoDTO): Promise<void>;
  delete({ cpf, userId }: IDeleteAlunoDTO): Promise<void>;
}
