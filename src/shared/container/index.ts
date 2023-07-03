import { container } from "tsyringe";

import "./services";

import { AlunosRepository } from "@modules/accounts/infra/prisma/repositories/AlunosRepository";
import { UsersRepository } from "@modules/accounts/infra/prisma/repositories/UsersRepository";
import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CheckinRepository } from "@modules/checkin/infra/prisma/repositories/CheckinRepository";
import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { CoursesRepository } from "@modules/courses/infra/prisma/repositories/CoursesRepository";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { LocationsRepository } from "@modules/locations/infra/prisma/LocationsRepository";
import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { FoodsRepository } from "@modules/menu/infra/prisma/FoodsRepository";
import { IngredientsRepository } from "@modules/menu/infra/prisma/IngredientsRepository";
import { MenuRepository } from "@modules/menu/infra/prisma/MenuRepository";
import { IFoodsRepository } from "@modules/menu/repositories/IFoodsRepository";
import { IIngredientsRepository } from "@modules/menu/repositories/IIngredientsReposirory";
import { IMenuRepository } from "@modules/menu/repositories/IMenuRepository";
import { TurmasRepository } from "@modules/turmas/infra/prisma/repositories/TurmasRepository";
import { ITurmasRepository } from "@modules/turmas/repositories/ITurmasRepository";

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

container.registerSingleton<ICheckinRepository>(
  "CheckinRepository",
  CheckinRepository
);

container.registerSingleton<ICoursesRepository>(
  "CoursesRepository",
  CoursesRepository
);

container.registerSingleton<ITurmasRepository>(
  "TurmasRepository",
  TurmasRepository
);
