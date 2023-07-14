import { Turma } from "@prisma/client";

interface ICreateTurmasDTO {
  id: string;
  name: string;
}

export interface ITurmasRepository {
  create({ id, name }: ICreateTurmasDTO): Promise<void>;
  findTurmaByName(name: string): Promise<Turma>;
  searchTurmasByName(name: string): Promise<Turma[]>;
  findTurmaById(id: string): Promise<Turma>;
  list(): Promise<Turma[]>;
  delete(id: string): Promise<void>;
  update({ id, name }: ICreateTurmasDTO): Promise<void>;
}
