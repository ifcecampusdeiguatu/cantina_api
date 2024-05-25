import { ICreateMatriculaDTO } from "../dtos/matriculas/ICreateMatriculaDTO";
import { IUpdateMatriculaDTO } from "../dtos/matriculas/IUpdateMatriculaDTO";
import { Matricula } from "../infra/entities/Matricula";

export interface IMatriculasRepository {
  create({
    matricula,
    situacaoMatricula,
    turno,
    alunoCpf,
    turmaId,
    cursoId,
  }: ICreateMatriculaDTO): Promise<Matricula>;
  list(): Promise<Matricula[]>;
  update({
    matricula,
    newMatricula,
    situacaoMatricula,
    turno,
    alunoCpf,
    turmaId,
    cursoId,
  }: IUpdateMatriculaDTO): Promise<Matricula>;
  delete(matricula: string): Promise<void>;
  findMatriculasByAlunoCpf(cpf: string): Promise<Matricula>;
  findMatricula(matricula: string): Promise<Matricula>;
}
