/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import "reflect-metadata";

import { Checkin } from "@modules/checkin/infra/entities/Checkin";
import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { CheckinRepositoryInMemory } from "@modules/checkin/repositories/in-memory/CheckinRepositoryInMemory";
import { IMealsRepository } from "@modules/meal/repositories/IMealsRepository";
import { MealsRepositoryInMemory } from "@modules/meal/repositories/in-memory/MealRepositoryInMemory";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsProvider } from "@shared/container/providers/DateProvider/implementations/DayjsProvider";

import { CreateCheckinUseCase } from "./CreateCheckinUseCase";

let checkinRepositoryInMemory: ICheckinRepository;
let mealsRepositoryInMemory: IMealsRepository;
let dayjsProvider: IDateProvider;
let createCheckinUseCase: CreateCheckinUseCase;

describe("Create a checkin", () => {
  beforeAll(() => {
    checkinRepositoryInMemory = new CheckinRepositoryInMemory();
    mealsRepositoryInMemory = new MealsRepositoryInMemory();
    dayjsProvider = new DayjsProvider();
    createCheckinUseCase = new CreateCheckinUseCase(
      checkinRepositoryInMemory,
      mealsRepositoryInMemory,
      dayjsProvider
    );
  });

  it("should be able create a checkin", async () => {
    const meal = await mealsRepositoryInMemory.create({
      schedule: new Date("2023-10-18T19:49:33.899Z"),
      dishId: "id_fake",
      localId: "local_fake",
    });

    const checkin = await createCheckinUseCase.execute({
      mealId: meal.id,
      status: "reseved",
      userId: "user_fake",
    });

    expect(checkin).toHaveProperty("id");
  });

  it("should be available until 23:59:59 the day before the meal", async () => {
    // PS: UTC-0 (11:30 in UTC-0 -> 8:30 in GMT-0300 Brazilian)
    const schedules = [
      new Date("2023-10-20T11:30:00.000Z"),
      new Date("2023-10-20T14:40:00.000Z"),
      new Date("2023-10-20T18:30:00.000Z"),
      new Date("2023-10-20T23:40:00.000Z"),
      new Date("2023-10-21T11:30:00.000Z"),
      new Date("2023-10-21T14:40:00.000Z"),
      new Date("2023-10-21T18:30:00.000Z"),
      new Date("2023-10-21T23:40:00.000Z"),
    ];

    const expiresDates = [
      new Date("2023-10-20T02:59:59.000Z"),
      new Date("2023-10-20T02:59:59.000Z"),
      new Date("2023-10-20T02:59:59.000Z"),
      new Date("2023-10-20T02:59:59.000Z"),
      new Date("2023-10-21T02:59:59.000Z"),
      new Date("2023-10-21T02:59:59.000Z"),
      new Date("2023-10-21T02:59:59.000Z"),
      new Date("2023-10-21T02:59:59.000Z"),
    ];

    const checkins: Checkin[] = [];

    for (const schedule of schedules) {
      const meal = await mealsRepositoryInMemory.create({
        schedule,
        dishId: "id_fake",
        localId: "local_fake",
      });

      const checkin = await createCheckinUseCase.execute({
        mealId: meal.id,
        status: "reseved",
        userId: "user_fake",
      });

      checkins.push(checkin);
    }

    for (let count = 0; count < checkins.length; count += 1) {
      expect(checkins[count].expiresDate).toEqual(expiresDates[count]);
    }
  });
});
