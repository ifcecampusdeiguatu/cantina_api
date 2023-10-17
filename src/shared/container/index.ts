import { container } from "tsyringe";

import "./services";
import "./providers";

import { AlunosRepository } from "@modules/accounts/infra/prisma/repositories/AlunosRepository";
import { FuncionariosRepository } from "@modules/accounts/infra/prisma/repositories/FuncionariosRepository";
import { ServidoresRepository } from "@modules/accounts/infra/prisma/repositories/ServidoresRepository";
import { UsersRepository } from "@modules/accounts/infra/prisma/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/prisma/repositories/UsersTokensRepository";
import { IAlunosRepository } from "@modules/accounts/repositories/IAlunosRepository";
import { IFuncionariosRepository } from "@modules/accounts/repositories/IFuncionariosRepository";
import { IServidoresRepository } from "@modules/accounts/repositories/IServidoresRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { CheckinRepository } from "@modules/checkin/infra/prisma/repositories/CheckinRepository";
import { CheckinTokensRepository } from "@modules/checkin/infra/prisma/repositories/CheckinTokensRepository";
import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { ICheckinTokensRepository } from "@modules/checkin/repositories/ICheckinTokensRepository";
import { CursosRepository } from "@modules/cursos/infra/prisma/repositories/CursosRepository";
import { ICursosRepository } from "@modules/cursos/repositories/ICursosRepository";
import { LocationsRepository } from "@modules/locations/infra/prisma/LocationsRepository";
import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { DishesRepository } from "@modules/meal/infra/prisma/DishesRepository";
import { IngredientsRepository } from "@modules/meal/infra/prisma/IngredientsRepository";
import { MealsRepository } from "@modules/meal/infra/prisma/MealsRepository";
import { IDishesRepository } from "@modules/meal/repositories/IDishesRepository";
import { IIngredientsRepository } from "@modules/meal/repositories/IIngredientsReposirory";
import { IMealsRepository } from "@modules/meal/repositories/IMealsRepository";
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

container.registerSingleton<IDishesRepository>(
  "DishesRepository",
  DishesRepository
);

container.registerSingleton<IMealsRepository>(
  "MealsRepository",
  MealsRepository
);

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

container.registerSingleton<ICheckinTokensRepository>(
  "CheckinTokensRepository",
  CheckinTokensRepository
);

container.registerSingleton<ICursosRepository>(
  "CursosRepository",
  CursosRepository
);

container.registerSingleton<ITurmasRepository>(
  "TurmasRepository",
  TurmasRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);
