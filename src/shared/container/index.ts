import { container } from "tsyringe";

import "./services";

import { AlunosRepository } from "@modules/alunos/infra/prisma/AlunosRepository";
import { IAlunosRepository } from "@modules/alunos/repositories/IAlunosRepository";
import { IngredientsRepository } from "@modules/menu/infra/prisma/IngredientsRepository";
import { IIngredientsRepository } from "@modules/menu/repositories/IIngredientsReposirory";

container.registerSingleton<IAlunosRepository>(
  "AlunosRepository",
  AlunosRepository
);

container.registerSingleton<IIngredientsRepository>(
  "IngredientsRepository",
  IngredientsRepository
);
