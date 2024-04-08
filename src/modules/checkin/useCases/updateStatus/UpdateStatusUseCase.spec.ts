import "reflect-metadata";
import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { CheckinRepositoryInMemory } from "@modules/checkin/repositories/in-memory/CheckinRepositoryInMemory";
import { IMealsRepository } from "@modules/meal/repositories/IMealsRepository";
import { MealsRepositoryInMemory } from "@modules/meal/repositories/in-memory/MealRepositoryInMemory";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsProvider } from "@shared/container/providers/DateProvider/implementations/DayjsProvider";
import { AppError } from "@shared/errors/AppError";

import { UpdateStatusUseCase } from "./UpdateStatusUseCase";

let updateStateUseCase: UpdateStatusUseCase;
let dayjsProvider: IDateProvider;
let checkinRepositoryInMemoryUseCase: ICheckinRepository;
let mealsRepositoryInMemory: IMealsRepository;

const dateNow = new Date();

const date = {
  year: dateNow.getFullYear(),
  month: dateNow.getMonth() + 1,
  day: dateNow.getDate(),
};

function calcDate(add = 0) {
  const dayAdded = date.day + add;

  return dayAdded > 30
    ? {
        d: String(dayAdded - 30).padStart(2, "0"),
        m: String(date.month + 1).padStart(2, "0"),
      }
    : {
        d: String(dayAdded).padStart(2, "0"),
        m: String(date.month).padStart(2, "0"),
      };
}

describe("Update Status UseCase", () => {
  beforeAll(() => {
    checkinRepositoryInMemoryUseCase = new CheckinRepositoryInMemory();
    mealsRepositoryInMemory = new MealsRepositoryInMemory();
    dayjsProvider = new DayjsProvider();
    updateStateUseCase = new UpdateStatusUseCase(
      checkinRepositoryInMemoryUseCase,
      mealsRepositoryInMemory,
      dayjsProvider
    );
  });

  it("should be possible to cancel a checkin", async () => {
    const { d: day, m: month } = calcDate(3);

    const schedule = `${date.year}-${month}-${day}T11:30:00.000Z`;
    const expiresDate = `${date.year}-${month}-${day}T02:59:59.000Z`;

    const meal = await mealsRepositoryInMemory.create({
      schedule: new Date(schedule),
      dishId: "dishFakeID",
      localId: "localFakeID",
    });

    const checkin = await checkinRepositoryInMemoryUseCase.create({
      status: "reserved",
      expiresDate: new Date(expiresDate),
      mealId: meal.id,
      userId: "userFakeID",
    });

    await updateStateUseCase.execute({
      id: checkin.id,
      status: "canceled",
      user: {
        id: "userFakeID",
        type: "aluno",
      },
    });

    const checkinUpdated = await checkinRepositoryInMemoryUseCase.findById(
      checkin.id
    );

    expect(checkinUpdated.status).toEqual("canceled");
  });

  it("should not be able to cancel lunch and morning snack after 6am on the day of the meal", async () => {
    const month = String(date.month).padStart(2, "0");
    const day = String(date.day).padStart(2, "0");

    const schedule = `${date.year}-${month}-${day}T11:30:00.000Z`;
    const expiresDate = `${date.year}-${month}-${day}T02:59:59.000Z`;
    const date_start = `${date.year}-${month}-${day}T09:10:00.000Z`;

    const meal = await mealsRepositoryInMemory.create({
      schedule: new Date(schedule),
      dishId: "dishFakeID",
      localId: "localFakeID",
    });

    const checkin = await checkinRepositoryInMemoryUseCase.create({
      status: "reserved",
      expiresDate: new Date(expiresDate),
      mealId: meal.id,
      userId: "userFakeID",
    });

    await expect(
      updateStateUseCase.execute(
        {
          id: checkin.id,
          status: "canceled",
          user: {
            id: "userFakeID",
            type: "aluno",
          },
        },
        new Date(date_start)
      )
    ).rejects.toEqual(new AppError("Cancellation deadline has expired"));
  });

  it("should not be able to cancel Afternoon Snack after 11am on the day of the meal", async () => {
    const month = date.month.toString().padStart(2, "0");
    const day = String(date.day).padStart(2, "0");
    const date_start = `${date.year}-${month}-${day}T14:10:00.000Z`;

    const schedule = `${date.year}-${month}-${day}T18:30:00.000Z`;
    const expiresDate = `${date.year}-${month}-${day}T02:59:59.000Z`;

    const meal = await mealsRepositoryInMemory.create({
      schedule: new Date(schedule),
      dishId: "dishFakeID",
      localId: "localFakeID",
    });

    const checkin = await checkinRepositoryInMemoryUseCase.create({
      status: "reserved",
      expiresDate: new Date(expiresDate),
      mealId: meal.id,
      userId: "userFakeID",
    });

    await expect(
      updateStateUseCase.execute(
        {
          id: checkin.id,
          status: "canceled",
          user: {
            id: "userFakeID",
            type: "aluno",
          },
        },
        new Date(date_start)
      )
    ).rejects.toEqual(new AppError("Cancellation deadline has expired"));
  });

  it("should not be able to cancel Night Snack after 16pm on the day of the meal", async () => {
    const month = date.month.toString().padStart(2, "0");
    const day = String(date.day).padStart(2, "0");
    const date_start = `${date.year}-${month}-${day}T21:10:00.000Z`;

    const schedule = `${date.year}-${month}-${day}T23:30:00.000Z`;
    const expiresDate = `${date.year}-${month}-${day}T02:59:59.000Z`;

    const meal = await mealsRepositoryInMemory.create({
      schedule: new Date(schedule),
      dishId: "dishFakeID",
      localId: "localFakeID",
    });

    const checkin = await checkinRepositoryInMemoryUseCase.create({
      status: "reserved",
      expiresDate: new Date(expiresDate),
      mealId: meal.id,
      userId: "userFakeID",
    });

    await expect(
      updateStateUseCase.execute(
        {
          id: checkin.id,
          status: "canceled",
          user: {
            id: "userFakeID",
            type: "aluno",
          },
        },
        new Date(date_start)
      )
    ).rejects.toEqual(new AppError("Cancellation deadline has expired"));
  });
});
