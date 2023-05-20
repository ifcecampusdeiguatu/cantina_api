import { container } from "tsyringe";

import "./services";

import { AlunosRepository } from "@modules/alunos/infra/prismic/AlunosRepository";
import { IAlunosRepository } from "@modules/alunos/repositories/IAlunosRepository";

container.registerSingleton<IAlunosRepository>(
  "AlunosRepository",
  AlunosRepository
);
