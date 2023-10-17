import { ICreateAlunosDTO } from "@modules/accounts/dtos/alunos/ICreateAlunosDTO";
import { IUpdateAlunoDTO } from "@modules/accounts/dtos/alunos/IUpdateAlunoDTO";
import { Aluno } from "@modules/accounts/infra/entities/Aluno";

import { IAlunosRepository } from "../IAlunosRepository";

export class AlunosRepositoryInMemory implements IAlunosRepository {
  alunos: Aluno[] = [];

  async create({
    matricula,
    name,
    turmaId,
    cursoId,
    userId,
  }: ICreateAlunosDTO): Promise<void> {
    const aluno = Object() as Aluno;

    Object.assign(aluno, { matricula, name, turmaId, cursoId, userId });

    this.alunos.push(aluno);
  }

  async findAlunoByMatricula(matricula: string): Promise<Aluno> {
    return this.alunos.find((aluno) => aluno.matricula === matricula);
  }

  async list(): Promise<Aluno[]> {
    return this.alunos;
  }

  async update({
    matricula,
    name,
    cursoId,
    turmaId,
  }: IUpdateAlunoDTO): Promise<void> {
    const findIndex = this.alunos.findIndex(
      (aluno) => aluno.matricula === matricula
    );

    this.alunos[findIndex] = {
      ...this.alunos[findIndex],
      matricula,
      name,
      cursoId,
      turmaId,
    };
  }

  async delete(matricula: string): Promise<void> {
    const findIndex = this.alunos.findIndex(
      (aluno) => aluno.matricula === matricula
    );

    this.alunos.splice(findIndex);
  }
}
