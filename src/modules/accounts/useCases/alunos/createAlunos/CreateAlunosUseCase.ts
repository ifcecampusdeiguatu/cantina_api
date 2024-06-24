import { inject, injectable } from "tsyringe";

import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";
import { IMatriculasRepository } from "@modules/accounts/repositories/IMatriculasRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUser } from "@modules/accounts/types";
import { ICursosRepository } from "@modules/cursos/repositories/ICursosRepository";
import { ITurmasRepository } from "@modules/turmas/repositories/ITurmasRepository";
import { AppError } from "@shared/errors/AppError";
import { Turno } from "@prisma/client";

type MatriculaData = {
  matricula: string;
  situacao: "matriculado" | "concludente";
  turno: "vespertino" | "integral" | "noturno" | "matutino";
  turmaId?: string;
  cursoId?: string;
};

interface IRequest {
  cpf: string;
  nome: string;
  sexo: string;
  userId: string;
  cidade?: string;
  matriculas: MatriculaData[];
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
    private usersRepository: IUsersRepository,
    @inject("MatriculasRepository")
    private matriculaRepository: IMatriculasRepository
  ) {}

  async execute({
    cpf,
    nome,
    sexo,
    cidade,
    userId,
    matriculas,
  }: IRequest): Promise<void> {
    const alunoAlreadyExists = await this.alunosRepository.findAlunoByCpf({cpf, matriculas: false});

    if (alunoAlreadyExists) {
      throw new AppError("Aluno já foi cadastrado");
    }

    await this.validateUserId(userId);

    const matriculasData = await this.validateMatricula(matriculas, cpf);

    await this.alunosRepository.create({
      cpf,
      nome,
      sexo,
      cidade,
      userId,
    });

    try {
      await this.createMatriculas(matriculasData, cpf);
    } catch (error) {
      console.log(error);
      throw new AppError("Erro ao criar matrículas", 500);
    }
  }

  async createMatriculas(
    matriculas: MatriculaData[],
    alunoCpf: string
  ): Promise<void> {
    const promises = matriculas.map(async (matriculaData) => {
      const curso = matriculaData.cursoId
        ? await this.cursosRepository.findCursoById(matriculaData.cursoId)
        : null;
      const turma = matriculaData.turmaId
        ? await this.turmasRepository.findTurmaById(matriculaData.turmaId)
        : null; 

      return this.matriculaRepository.create({
        matricula: matriculaData.matricula,
        situacaoMatricula: matriculaData.situacao,
        turno: ["vespertino", "integral", "noturno", "matutino"].includes(matriculaData.turno) ? matriculaData.turno : undefined,
        alunoCpf,
        turmaId: turma?.id || undefined,
        cursoId: curso?.id || undefined,
      });
    });

    await Promise.all(promises);
  }

  async validateMatricula(
    matriculas: MatriculaData[],
    userCpf: string
  ): Promise<MatriculaData[]> {
    const promises = matriculas.map(async (matriculaData) => {
      const matricula = await this.matriculaRepository.findMatricula(
        matriculaData.matricula
      );

      if (matricula && matricula.alunoCpf !== userCpf) {
        throw new AppError("Matrícula pertence a outro aluno", 400);
      }

      return matriculaData;
    });

    const arrMatriculas = await Promise.all(promises);

    return arrMatriculas.filter((matricula) => matricula !== null);
  }

  async validateUserId(userId: string): Promise<void> {
    const user: IUser = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new AppError("Usuário não existe");
    }

    if (user.type !== "aluno") {
      throw new AppError("Usuário não é um aluno");
    }

    if (user.aluno) {
      throw new AppError("Usuário já está associado a um aluno");
    }
  }
}
