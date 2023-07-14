import { inject, injectable } from "tsyringe";

import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUser } from "@modules/accounts/types";
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

    if (alunoAlreadyExists) {
      throw new AppError("Aluno já foi cadastrado");
    }

    const user: IUser = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new AppError("Usuário não existe");
    }

    if (user.type !== "aluno") {
      throw new AppError("Usuário não é um aluno");
    }

    if (user.aluno) {
      throw new AppError("Usuário já está associado a outra conta");
    }

    const course = cursoId
      ? await this.coursesRepository.findCourseById(cursoId)
      : undefined;

    const turma = turmaId
      ? await this.turmasRepository.findTurmaById(turmaId)
      : undefined;

    if (course === null) {
      throw new AppError("Curso não encontrado", 404);
    }

    if (turma === null) {
      throw new AppError("Turma não encontrada", 404);
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
