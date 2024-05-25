import { SituacaoMatricula, Turno } from "@modules/accounts/types";

export interface ICreateMatriculaDTO {
  matricula: string;
  situacaoMatricula: SituacaoMatricula;
  turno: Turno;
  alunoCpf?: string;
  turmaId?: string;
  cursoId?: string;
}
