import { Curso, Turma } from "@prisma/client";

type Situacao = "matriculado" | "concludente";
type Turno = "vespertino" | "integral" | "noturno" | "matutino";

export class Aluno {
  matricula: string;
  name: string;
  sexo: string;
  createdAt: Date;
  updatedAt: Date;
  situacao: Situacao;
  turno: Turno;
  userId: string;
  turmaId?: string;
  cursoId?: string;
  cidadeId?: string;
  turma?: Turma;
  curso?: Curso;
}
