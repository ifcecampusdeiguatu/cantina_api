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
import { AppError } from "@shared/errors/AppError";

import { CreateCheckinUseCase } from "./CreateCheckinUseCase";

let checkinRepositoryInMemory: ICheckinRepository;
let mealsRepositoryInMemory: IMealsRepository;
let dayjsProvider: IDateProvider;
let createCheckinUseCase: CreateCheckinUseCase;

const dateNow: Date = new Date();

const date = {
  year: dateNow.getFullYear(),
  month: dateNow.getMonth() + 1,
  day: dateNow.getDate(),
};

function calcDate(add = 0) {
  let dayAdded = date.day + add;
  let nextMonth = date.month;

  if (dayAdded > 30) {
    dayAdded -= 30;
    nextMonth += 1;
  }

  if (nextMonth > 12) nextMonth = 1;

  return {
    d: String(dayAdded).padStart(2, "0"),
    m: String(nextMonth).padStart(2, "0"),
  };
}

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
    const schedule = dayjsProvider.addDays(new Date(), 2);

    const meal = await mealsRepositoryInMemory.create({
      schedule,
      dishId: "id_fake",
      localId: "local_fake",
    });

    const checkin = await createCheckinUseCase.execute({
      mealId: meal.id,
      status: "reserved",
      userId: "user_fake",
    });

    expect(checkin).toHaveProperty("id");
  });

  it("should be available until 23:59:59 the day before the meal", async () => {
    // PS: UTC-0 (11:30 in UTC-0 -> 8:30 in GMT-0300 Brazilian)
    const { m: month } = calcDate(3);
    const day = (add = 0) => calcDate(add).d;

    const schedules = [
      new Date(`${date.year}-${month}-${day(3)}T11:30:00.000Z`),
      new Date(`${date.year}-${month}-${day(3)}T14:40:00.000Z`),
      new Date(`${date.year}-${month}-${day(3)}T18:30:00.000Z`),
      new Date(`${date.year}-${month}-${day(3)}T23:40:00.000Z`),
      new Date(`${date.year}-${month}-${day(4)}T11:30:00.000Z`),
      new Date(`${date.year}-${month}-${day(4)}T14:40:00.000Z`),
      new Date(`${date.year}-${month}-${day(4)}T18:30:00.000Z`),
      new Date(`${date.year}-${month}-${day(4)}T23:40:00.000Z`),
    ];

    const expiresDates = [
      new Date(`${date.year}-${month}-${day(3)}T02:59:59.000Z`),
      new Date(`${date.year}-${month}-${day(3)}T02:59:59.000Z`),
      new Date(`${date.year}-${month}-${day(3)}T02:59:59.000Z`),
      new Date(`${date.year}-${month}-${day(3)}T02:59:59.000Z`),
      new Date(`${date.year}-${month}-${day(4)}T02:59:59.000Z`),
      new Date(`${date.year}-${month}-${day(4)}T02:59:59.000Z`),
      new Date(`${date.year}-${month}-${day(4)}T02:59:59.000Z`),
      new Date(`${date.year}-${month}-${day(4)}T02:59:59.000Z`),
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
        status: "reserved",
        userId: "user_fake",
      });

      checkins.push(checkin);
    }

    for (let count = 0; count < checkins.length; count += 1) {
      expect(checkins[count].expiresDate).toEqual(expiresDates[count]);
    }
  });

  it("Check-in should not be carried out from the date of creation or after the day of the meal", async () => {
    const { m: month } = calcDate(3);
    const day = (add = 0) => calcDate(add).d;

    const schedule = new Date(`${date.year}-${month}-${day(0)}T19:49:33.899Z`);

    const meal = await mealsRepositoryInMemory.create({
      schedule,
      dishId: "id_fake",
      localId: "local_fake",
    });

    await expect(
      createCheckinUseCase.execute({
        mealId: meal.id,
        status: "reserved",
        userId: "user_fake",
      })
    ).rejects.toEqual(new AppError("Meal unavailable for check in", 400));
  });

  it("should not be possible to create a check-in after the fifth day of the current date", async () => {
    const dAndM6 = calcDate(6);
    const dAndM1 = calcDate(1);

    const dateString = `${date.year}-${dAndM6.m}-${dAndM6.d}T23:40:00.000Z`;

    const schedule = new Date(dateString);

    const meal = await mealsRepositoryInMemory.create({
      schedule,
      dishId: "id_fake",
      localId: "local_fake",
    });

    const checkin = await createCheckinUseCase.execute(
      {
        mealId: meal.id,
        status: "reserved",
        userId: "user_fake",
      },
      new Date(`${date.year}-${dAndM1.m}-${dAndM1.d}T11:40:00.000Z`)
    );

    await expect(
      createCheckinUseCase.execute({
        mealId: meal.id,
        status: "reserved",
        userId: "user_fake",
      })
    ).rejects.toEqual(new AppError("Meal not yet available for check-in", 400));

    expect(checkin).toHaveProperty("id");
  });
});
