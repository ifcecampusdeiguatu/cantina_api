import { v4 as uuid } from "uuid";

enum Type {
  aluno = 1,
  servidor,
  funcionario,
}

export class User {
  id?: string;
  email: string;
  password: string;
  type: Type;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    if (this.id == null) {
      this.id = uuid();
    }
  }
}
