import { Funcionario, Servidor, Situacao } from "@prisma/client";

import { Aluno } from "../infra/entities/Aluno";
import { User } from "../infra/entities/User";

export interface IUser extends User {
  aluno?: Aluno;
  funcionario?: Funcionario;
  servidor?: Servidor;
}

export type SituacaoMatricula = Situacao;

export type Turno =
  | "vespertino"
  | "integral"
  | "noturno"
  | "matutino"
  | "diurno";
