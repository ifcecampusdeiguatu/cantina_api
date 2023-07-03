import { inject, injectable } from "tsyringe";

import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { ITurmasRepository } from "@modules/turmas/repositories/ITurmasRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  matricula: string;
  name: string;
  turmaId?: string;
  cursoId?: string;
  userId: string;
}

@injectable()
export class CreateAlunosUseCase {
  constructor(
    @inject("AlunosRepository")
    private alunosRepository: IAlunosRepository,
    @inject("TurmasRepository")
    private turmasRepository: ITurmasRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    matricula,
    name,
    turmaId,
    cursoId,
    userId,
  }: IRequest): Promise<void> {
    const alunoAlreadyExists = await this.alunosRepository.findAlunoByMatricula(
      matricula
    );

    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User not exist");
    }

    if (alunoAlreadyExists) {
      throw new AppError("Aluno já foi cadastrado");
    }

    if (cursoId) {
      const course = await this.coursesRepository.findCourseById(cursoId);

      if (!course) {
        throw new AppError("Course not found", 404);
      }
    }

    if (turmaId) {
      const turma = await this.turmasRepository.findTurmaById(turmaId);

      if (!turma) {
        throw new AppError("Turma not found", 404);
      }
    }

    await this.alunosRepository.create({
      matricula,
      name,
      userId,
      turmaId,
      cursoId,
    });
  }
}
