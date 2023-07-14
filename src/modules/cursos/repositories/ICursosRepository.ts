import { Curso } from "@prisma/client";

interface ICreateCursosDTO {
  id: string;
  name: string;
}

export interface ICursosRepository {
  create({ id, name }: ICreateCursosDTO): Promise<void>;
  findCursoByName(name: string): Promise<Curso>;
  searchCursosByName(name: string): Promise<Curso[]>;
  findCursoById(id: string): Promise<Curso>;
  list(): Promise<Curso[]>;
  delete(id: string): Promise<void>;
  update({ id, name }: ICreateCursosDTO): Promise<void>;
}
