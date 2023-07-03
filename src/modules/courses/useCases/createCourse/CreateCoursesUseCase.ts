import { inject, injectable } from "tsyringe";

import { CoursesRepository } from "@modules/courses/infra/prisma/repositories/CoursesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id?: string;
  name: string;
}

@injectable()
export class CreateCoursesUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: CoursesRepository
  ) {}

  async execute({ id, name }: IRequest) {
    const course = await this.coursesRepository.findCourseByName(name);

    if (course) {
      throw new AppError("Already a course with the same name");
    }

    await this.coursesRepository.create({ id, name });
  }
}
