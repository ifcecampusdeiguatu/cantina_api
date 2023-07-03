import { Turma } from "@prisma/client";

interface ICreateTurmaDTO {
  id?: string;
  name: string;
}

export interface ITurmasRepository {
  create({ id, name }: ICreateTurmaDTO): Promise<void>;
  findTurmaByName(name: string): Promise<Turma>;
  findTurmaById(id: string): Promise<Turma>;
  list(): Promise<Turma[]>;
}
