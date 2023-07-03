import { Aluno, Funcionario, Servidor, User } from "@prisma/client";

export interface IUser extends User {
  aluno?: Aluno;
  funcionario?: Funcionario;
  servidor?: Servidor;
}
