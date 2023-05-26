import { container } from "tsyringe";

import "./services";

import { AlunosRepository } from "@modules/alunos/infra/prisma/AlunosRepository";
import { IAlunosRepository } from "@modules/alunos/repositories/IAlunosRepository";
import { FoodsRepository } from "@modules/menu/infra/prisma/FoodsRepository";
import { IngredientsRepository } from "@modules/menu/infra/prisma/IngredientsRepository";
import { MenuRepository } from "@modules/menu/infra/prisma/MenuRepository";
import { IFoodsRepository } from "@modules/menu/repositories/IFoodsRepository";
import { IIngredientsRepository } from "@modules/menu/repositories/IIngredientsReposirory";
import { IMenuRepository } from "@modules/menu/repositories/IMenuRepository";

container.registerSingleton<IAlunosRepository>(
  "AlunosRepository",
  AlunosRepository
);

container.registerSingleton<IIngredientsRepository>(
  "IngredientsRepository",
  IngredientsRepository
);

container.registerSingleton<IFoodsRepository>(
  "FoodsRepository",
  FoodsRepository
);

container.registerSingleton<IMenuRepository>("MenuRepository", MenuRepository);
