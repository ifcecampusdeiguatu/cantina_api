import { Curso } from "@prisma/client";

interface ICreateCoursesDTO {
  id?: string;
  name: string;
}

export interface ICoursesRepository {
  create({ id, name }: ICreateCoursesDTO): Promise<void>;
  findCourseByName(name: string): Promise<Curso>;
  findCourseById(id: string): Promise<Curso>;
  list(): Promise<Curso[]>;
}
