import { SituacaoMatricula, Turno } from "@modules/accounts/types";
import { Situacao } from "@prisma/client";

export class Matricula {
  matricula: string;
  turno: Turno;
  createdAt: Date;
  updatedAt: Date;
  situacaoMatricula: SituacaoMatricula | Situacao;
  alunoCpf: string;
  turmaId: string | null;
  cursoId: string | null;
}
