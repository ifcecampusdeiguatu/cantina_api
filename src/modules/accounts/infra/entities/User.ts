import { v4 as uuid } from "uuid";

import { Aluno } from "./Aluno";

type Type = "aluno" | "funcionario" | "servidor";

export class User {
  id: string;
  email?: string;
  password: string;
  type: Type;
  createdAt: Date;
  updatedAt: Date;

  alunos?: Array<Aluno>;

  constructor() {
    if (this.id == null) {
      this.id = uuid();
    }
  }
}
