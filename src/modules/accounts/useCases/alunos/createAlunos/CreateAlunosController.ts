import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAlunosUseCase } from "./CreateAlunosUseCase";

type MatriculaData = {
  matricula: string;
  situacao: "matriculado" | "concludente";
  turno: "vespertino" | "integral" | "noturno" | "matutino";
  turmaId?: string;
  cursoId?: string;
};

interface IRequestData {
  cpf: string;
  nome: string;
  sexo: string;
  userId: string;
  cidade?: string;
  matriculas: MatriculaData[];
}

export class CreateAlunosController {
  async handle(
    request: Request<unknown, unknown, IRequestData>,
    response: Response
  ): Promise<Response> {
    const { cpf, userId, nome, sexo, cidade, matriculas } = request.body;

    if (
      !cpf ||
      !nome ||
      !sexo ||
      !userId ||
      !matriculas ||
      matriculas.length < 1
    ) {
      return response.status(400).json({ error: "Parâmetros insuficientes" });
    }

    for (let i = 0; i < matriculas.length; i += 1) {
      if (!matriculas[i].matricula) {
        return response.status(400).json({ error: "Parâmetros insuficientes" });
      }
    }

    const createAlunosUseCase = container.resolve(CreateAlunosUseCase);

    try {
      await createAlunosUseCase.execute({
        cpf,
        nome,
        sexo,
        cidade,
        matriculas,
        userId,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
