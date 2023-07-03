import { inject, injectable } from "tsyringe";

import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { Curso } from "@prisma/client";

@injectable()
export class ListCoursesUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository
  ) {}

  async execute(): Promise<Curso[]> {
    const courses = await this.coursesRepository.list();

    return courses;
  }
}
