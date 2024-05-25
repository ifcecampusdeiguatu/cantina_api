import { SituacaoMatricula, Turno } from "@modules/accounts/types";

export interface IUpdateMatriculaDTO {
  matricula: string;
  newMatricula?: string;
  situacaoMatricula?: SituacaoMatricula;
  turno?: Turno;
  alunoCpf?: string;
  turmaId?: string;
  cursoId?: string;
}
