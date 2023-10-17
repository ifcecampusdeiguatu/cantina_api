/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import "reflect-metadata";

import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { CheckinRepositoryInMemory } from "@modules/checkin/repositories/in-memory/CheckinRepositoryInMemory";
import { IMealsRepository } from "@modules/meal/repositories/IMealsRepository";
import { MealsRepositoryInMemory } from "@modules/meal/repositories/in-memory/MealRepositoryInMemory";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import { CreateCheckinUseCase } from "./CreateCheckinUseCase";

let checkinRepositoryInMemory: ICheckinRepository;
let mealsRepositoryInMemory: IMealsRepository;
let dayjsProvider: IDateProvider;
let createCheckinUseCase: CreateCheckinUseCase;

describe("Create a checkin", () => {
  beforeAll(() => {
    checkinRepositoryInMemory = new CheckinRepositoryInMemory();
    mealsRepositoryInMemory = new MealsRepositoryInMemory();
    createCheckinUseCase = new CreateCheckinUseCase(
      checkinRepositoryInMemory,
      mealsRepositoryInMemory,
      dayjsProvider
    );
  });

  it("should be able create a checkin", async () => {});
});
