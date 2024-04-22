import { inject, injectable } from "tsyringe";

import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUser } from "@modules/accounts/types";
import { ICursosRepository } from "@modules/cursos/repositories/ICursosRepository";
import { ITurmasRepository } from "@modules/turmas/repositories/ITurmasRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  matricula: string;
  name?: string;
  sexo?: string;
  turmaId?: string;
  cursoId?: string;
  userId?: string;
  situacao?: "matriculado" | "concludente";
  createdAt?: Date;
  updatedAt?: Date;
  turno?: "vespertino" | "integral" | "noturno" | "matutino";
}

@injectable()
export class CreateAlunosUseCase {
  constructor(
    @inject("AlunosRepository")
    private alunosRepository: IAlunosRepository,
    @inject("TurmasRepository")
    private turmasRepository: ITurmasRepository,
    @inject("CursosRepository")
    private cursosRepository: ICursosRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    matricula,
    sexo,
    createdAt,
    updatedAt,
    turno,
    situacao,
    name,
    userId,
    turmaId,
    cursoId,
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

    const curso = cursoId
      ? await this.cursosRepository.findCursoById(cursoId)
      : undefined;

    const turma = turmaId
      ? await this.turmasRepository.findTurmaById(turmaId)
      : undefined;

    if (curso === null) {
      throw new AppError("Curso não encontrado", 404);
    }

    if (turma === null) {
      throw new AppError("Turma não encontrada", 404);
    }

    await this.alunosRepository.create({
      matricula,
      sexo,
      createdAt,
      situacao,
      turno,
      updatedAt,
      name,
      userId,
      turmaId,
      cursoId,
    });
  }
}
