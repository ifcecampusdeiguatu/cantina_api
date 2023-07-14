import { container } from "tsyringe";

import "./services";

import { AlunosRepository } from "@modules/accounts/infra/prisma/repositories/AlunosRepository";
import { FuncionariosRepository } from "@modules/accounts/infra/prisma/repositories/FuncionariosRepository";
import { ServidoresRepository } from "@modules/accounts/infra/prisma/repositories/ServidoresRepository";
import { UsersRepository } from "@modules/accounts/infra/prisma/repositories/UsersRepository";
import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";
import { IFuncionariosRepository } from "@modules/accounts/repositories/IFuncionariosRepository";
import { IServidoresRepository } from "@modules/accounts/repositories/IServidoresRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CheckinRepository } from "@modules/checkin/infra/prisma/repositories/CheckinRepository";
import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { CursosRepository } from "@modules/cursos/infra/prisma/repositories/CursosRepository";
import { ICursosRepository } from "@modules/cursos/repositories/ICursosRepository";
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

container.registerSingleton<IFuncionariosRepository>(
  "FuncionariosRepository",
  FuncionariosRepository
);

container.registerSingleton<IServidoresRepository>(
  "ServidoresRepository",
  ServidoresRepository
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

container.registerSingleton<ICursosRepository>(
  "CursosRepository",
  CursosRepository
);

container.registerSingleton<ITurmasRepository>(
  "TurmasRepository",
  TurmasRepository
);
