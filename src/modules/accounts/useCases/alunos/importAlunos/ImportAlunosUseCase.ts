/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
import { genSalt, hashSync } from "bcryptjs";
import { parse as csvParse } from "csv-parse";
import { Express } from "express";
import fs from "fs";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

import { Aluno } from "@modules/accounts/infra/entities/Aluno";
import { User } from "@modules/accounts/infra/entities/User";
import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICursosRepository } from "@modules/cursos/repositories/ICursosRepository";
import { ITurmasRepository } from "@modules/turmas/repositories/ITurmasRepository";
import { Curso, Turma } from "@prisma/client";

type Turno = "vespertino" | "integral" | "noturno" | "matutino";

type FileData = [
  matricula: string | null | undefined,
  name: string | null | undefined,
  sexo: string | null | undefined,
  situacaoM: string | null | undefined,
  pLetIngresso: string | null | undefined,
  turmaAtual: string | null | undefined,
  curso: string | null | undefined,
  turno: string | null | undefined,
  periodoAtual: string | null | undefined,
  email: string | null | undefined,
  cidade: string | null | undefined
];

/*
  Problema: Aluno pode estar em mais de uma turma e curso,
  logo ele pode ter dados duplicados

  1879 - 100
  600 - x

  Solução: 
    1 - Modificar relações de Alunos, Turmas e Cursos para
        Many to Many e refatorar.
    2 - Verificar se aluno já existe pelo email ou nome.



  Desejável: Atualizar alunos já existentes
*/

@injectable()
export class ImportAlunosUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("TurmasRepository")
    private turmasRepository: ITurmasRepository,
    @inject("CursosRepository")
    private cursosRepository: ICursosRepository,
    @inject("AlunosRepository")
    private alunosRepository: IAlunosRepository
  ) {}
  private turmas: Turma[] = [];
  private cursos: Curso[] = [];

  async loadAlunos(file: Express.Multer.File) {
    const alunos: Aluno[] = [];
    const users: User[] = [];

    const stream = fs.createReadStream(file.path, { encoding: "utf-8" });
    const parseFile = csvParse({ from_line: 2 });

    stream.pipe(parseFile);

    const promises = new Promise<{ alunos: Aluno[]; users: User[] }>(
      (resolve, reject) => {
        parseFile
          .on("data", async (line: FileData) => {
            // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
            const [mat, name, sexo, sitM, _1, turma, curso, turno, _2, email] =
              line;

            const _turma = this.createTurma(turma);

            const _curso = this.createCurso(curso);

            const aluno = {} as Aluno;

            const userEmail =
              email === undefined || email === "" ? null : email;

            const user = await this.createUser({
              name,
              email: userEmail,
              matricula: mat,
            });

            Object.assign(aluno, {
              matricula: mat,
              name,
              sexo: sexo === "M" ? "m" : "f",
              createdAt: new Date(),
              updatedAt: new Date(),
              situacao: sitM === "Matriculado" ? "matriculado" : "concludente",
              turno: turno.toLowerCase() as Turno,
              userId: user.id,
              turma: _turma,
              curso: _curso,
              cidadeId: null,
            });

            alunos.push(aluno);
            users.push(user);
          })
          .on("end", async () => {
            fs.unlink(file.path, (err) => {
              if (err) reject(err);

              console.log("file deleted");
            });

            resolve({ alunos, users });
          });
      }
    );

    return promises;
  }

  createTurma(name: string | null | undefined): Turma {
    const _turma = {} as Turma;

    if (!name || name === "" || name === undefined) {
      Object.assign(_turma, { name: null, id: null });

      return _turma;
    }

    if (this.turmas.some((i) => i.name === name)) {
      return this.turmas.find((turma) => turma.name === name);
    }

    Object.assign(_turma, {
      id: v4(),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.turmas.push(_turma);

    return _turma;
  }

  createCurso(name: string | null | undefined): Curso {
    const _curso = {} as Curso;

    if (!name || name === "" || name === undefined) {
      Object.assign(_curso, { name: null, id: null });

      return _curso;
    }

    if (this.cursos.some((i) => i.name === name)) {
      return this.cursos.find((curso) => curso.name === name);
    }

    Object.assign(_curso, {
      id: v4(),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.cursos.push(_curso);

    return _curso;
  }

  async createUser({
    name,
    email,
    matricula,
  }: {
    name: string;
    email: string | null;
    matricula: string;
  }): Promise<User> {
    const user = new User();

    let modifiedEmail = null;

    if (email) {
      modifiedEmail = email.includes(" / ") ? email.split(" / ")[0] : email;
    }

    const pwd = `${name
      .split(" ")
      .slice(0, 2)
      .map((name) => name[0])
      .join("")}.${matricula.slice(matricula.length - 6)}`;

    const salt = await genSalt(8);
    const password = hashSync(pwd, salt);

    Object.assign(user, {
      id: v4(),
      email: modifiedEmail,
      password,
      type: "aluno",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return user;
  }

  async execute(file: Express.Multer.File) {
    await this.loadAlunos(file)
      .then(async ({ alunos, users }) => {
        await Promise.all(
          this.cursos.map(async (curso) => {
            const _curso = await this.cursosRepository.findCursoByName(
              curso.name
            );

            if (!_curso) {
              await this.cursosRepository.create(curso);

              return curso;
            }

            return _curso;
          })
        ).then((cursos) => {
          this.cursos = cursos;
        });

        await Promise.all(
          this.turmas.map(async (turma) => {
            const _turma = await this.turmasRepository.findTurmaByName(
              turma.name
            );

            if (!_turma) {
              await this.turmasRepository.create(turma);

              return turma;
            }

            return _turma;
          })
        ).then((turmas) => {
          this.turmas = turmas;
        });

        return { alunos, users };
      })
      .then(({ alunos, users }) => {
        const alunosRes = alunos.map((aluno) => {
          const alunoUpdated = { ...aluno };

          const turma = this.turmas.find((t) => t.name === aluno.turma.name);
          const curso = this.cursos.find((c) => c.name === aluno.curso.name);

          if (turma) {
            alunoUpdated.turma = turma;
            alunoUpdated.turmaId = turma.id;
          }

          if (curso) {
            alunoUpdated.curso = curso;
            alunoUpdated.cursoId = curso.id;
          }

          return alunoUpdated;
        });

        return { alunos: alunosRes, users };
      })
      .then(async ({ alunos, users }) => {
        await Promise.resolve(
          alunos.map(async (aluno) => {
            const addAluno = { ...aluno };
            const user = users.find((u) => u.id === addAluno.userId);

            const checkEmail = user.email
              ? await this.usersRepository.findUserByEmail(user.email)
              : null;

            const checkMatricula =
              await this.usersRepository.findUserByMatricula(aluno.matricula);

            if (!checkMatricula) {
              if (!checkEmail) {
                await this.usersRepository.create({
                  id: user.id,
                  email: user.email || null,
                  password: user.password,
                  type: user.type,
                });
              }

              try {
                await this.alunosRepository.create({
                  matricula: aluno.matricula,
                  name: aluno.name,
                  sexo: aluno.sexo,
                  situacao: aluno.situacao,
                  turno: aluno.turno,
                  turmaId: aluno.turmaId ? addAluno.turmaId : null,
                  cursoId: aluno.cursoId ? addAluno.cursoId : null,
                  userId: checkEmail ? checkEmail.id : user.id,
                });
              } catch (error) {
                console.log("Error--------------------");
                console.log(aluno);
                console.log({ aluno: aluno.name, error });
                console.log("-------------------------");
              }
            }
          })
        );
      });
  }
}
