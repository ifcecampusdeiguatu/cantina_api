import { container } from "tsyringe";

import "./services";

import { UsersRepository } from "@modules/accounts/infra/prisma/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AlunosRepository } from "@modules/alunos/infra/prisma/AlunosRepository";
import { IAlunosRepository } from "@modules/alunos/repositories/IAlunosRepository";
import { LocationsRepository } from "@modules/locations/infra/prisma/LocationsRepository";
import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
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

container.registerSingleton<ILocationsRepository>(
  "LocationsRepository",
  LocationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
