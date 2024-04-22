type Turno = "vespertino" | "integral" | "noturno" | "matutino";
type Situacao = "matriculado" | "concludente";

export interface ICreateAlunosDTO {
  matricula: string;
  name: string;
  sexo: string;
  turmaId?: string;
  cursoId?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  turno?: Turno;
  situacao?: Situacao;
}
