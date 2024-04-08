import "reflect-metadata";
import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { CheckinRepositoryInMemory } from "@modules/checkin/repositories/in-memory/CheckinRepositoryInMemory";
import { Meal } from "@modules/meal/infra/entities/Meal";
import { IMealsRepository } from "@modules/meal/repositories/IMealsRepository";
import { MealsRepositoryInMemory } from "@modules/meal/repositories/in-memory/MealRepositoryInMemory";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsProvider } from "@shared/container/providers/DateProvider/implementations/DayjsProvider";
// import { AppError } from "@shared/errors/AppError";
import { calcDate, dateObject } from "@utils/handleDate";

import { ListCheckinsUseCase } from "./ListCheckinsUseCase";

let dateNow: Date;

let checkinRepositoryInMemory: ICheckinRepository;
let mealsRepositoryInMemory: IMealsRepository;
let dayjsProvider: IDateProvider;
let listCheckinsUseCase: ListCheckinsUseCase;

describe("List Checkins UseCase", () => {
  beforeEach(() => {
    dateNow = new Date();

    checkinRepositoryInMemory = new CheckinRepositoryInMemory();
    mealsRepositoryInMemory = new MealsRepositoryInMemory();
    dayjsProvider = new DayjsProvider();
    listCheckinsUseCase = new ListCheckinsUseCase(
      checkinRepositoryInMemory,
      dayjsProvider,
      mealsRepositoryInMemory
    );
  });

  it("should be able to list all checkins", async () => {
    const promises: Array<Promise<Meal>> = [];

    for (let i = 0; i < 5; i += 1) {
      const { m: month } = calcDate(i);
      const day = calcDate(i).d;

      promises.push(
        mealsRepositoryInMemory.create({
          dishId: `dish_id_${i}`,
          localId: `local_id_${i}`,
          schedule: new Date(
            `${dateObject.year}-${month}-${day}T23:40:00.000Z`
          ),
        })
      );
    }

    const meals = await Promise.all(promises);

    const checkins = await Promise.all(
      meals.map((meal) => {
        return checkinRepositoryInMemory.create({
          mealId: meal.id,
          expiresDate: dateNow,
          userId: `user_id`,
          status: "reserved",
        });
      })
    );

    expect(checkins.length).toBe(5);
    expect(checkins[0].status).toEqual("reserved");

    const listCheckins = await listCheckinsUseCase.execute();

    expect(listCheckins.length).toBe(5);
    expect(listCheckins[0].status).toEqual("lacked");
    expect(listCheckins[0]).toEqual({
      id: checkins[0].id,
      mealId: meals[0].id,
      expiresDate: dateNow,
      updatedAt: listCheckins[0].updatedAt,
      userId: `user_id`,
      status: "lacked",
    });
  });

  // it("must block the student if they have not checked in for 3 consecutive times", async () => {
  //   const promises: Array<Promise<Meal>> = [];

  //   for (let i = 0; i < 5; i += 1) {
  //     promises.push(
  //       mealsRepositoryInMemory.create({
  //         dishId: `dish_id_${i}`,
  //         localId: `local_id_${i}`,
  //         schedule: new Date(`${dateObject.year}-11-0${i + 1}T23:40:00.000Z`),
  //       })
  //     );
  //   }

  //   const meals = await Promise.all(promises);

  //   meals.forEach(async (meal) => {
  //     if (Number(meal.dishId.split("_")[2]) < 2)
  //       await checkinRepositoryInMemory.create({
  //         mealId: meal.id,
  //         expiresDate: dateNow,
  //         userId: `user_id`,
  //         status: "reserved",
  //       });
  //   });

  //   await expect(listCheckinsUseCase.execute()).rejects.toEqual(
  //     new AppError("Deu erro")
  //   );
  // });
});
