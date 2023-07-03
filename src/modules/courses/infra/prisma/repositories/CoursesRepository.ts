import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { Curso, PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

interface ICreateCoursesDTO {
  id?: string;
  name: string;
}

@injectable()
export class CoursesRepository implements ICoursesRepository {
  repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({ id = uuid(), name }: ICreateCoursesDTO): Promise<void> {
    await this.repository.curso.create({
      data: {
        id,
        name,
      },
    });
  }

  async findCourseByName(name: string): Promise<Curso> {
    const course = await this.repository.curso.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    return course;
  }
  async findCourseById(id: string): Promise<Curso> {
    const course = await this.repository.curso.findUnique({ where: { id } });

    return course;
  }

  async list(): Promise<Curso[]> {
    const courses = await this.repository.curso.findMany();

    return courses;
  }
}
