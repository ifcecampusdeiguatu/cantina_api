import "reflect-metadata";
import { Checkin } from "@modules/checkin/infra/entities/Checkin";
import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { CheckinRepositoryInMemory } from "@modules/checkin/repositories/in-memory/CheckinRepositoryInMemory";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsProvider } from "@shared/container/providers/DateProvider/implementations/DayjsProvider";

import { ListCheckinsUseCase } from "./ListCheckinsUseCase";

let checkinRepositoryInMemory: ICheckinRepository;
let dayjsProvider: IDateProvider;
let listCheckinsUseCase: ListCheckinsUseCase;

describe("List Checkins UseCase", () => {
  beforeEach(() => {
    checkinRepositoryInMemory = new CheckinRepositoryInMemory();
    dayjsProvider = new DayjsProvider();
    listCheckinsUseCase = new ListCheckinsUseCase(
      checkinRepositoryInMemory,
      dayjsProvider
    );
  });

  it("should be able to list all checkins", async () => {
    const promises: Array<Promise<Checkin>> = [];

    const dateNow = new Date();

    const checkins: Checkin[] = [];

    for (let i = 0; i < 5; i += 1) {
      promises.push(
        checkinRepositoryInMemory.create({
          mealId: `meal_id_${i}`,
          expiresDate: dateNow,
          userId: `user_id_${i}`,
          status: "reserved",
        })
      );
    }
    await Promise.all(promises).then((responses) => {
      responses.forEach((checkin) => {
        checkins.push(checkin);
      });
    });

    expect(checkins.length).toBe(5);
    expect(checkins[0].status).toEqual("reserved");

    const listCheckins = await listCheckinsUseCase.execute();

    expect(listCheckins.length).toBe(5);
    expect(listCheckins[0].status).toEqual("lacked");
    expect(listCheckins[0]).toEqual({
      id: checkins[0].id,
      mealId: `meal_id_0`,
      expiresDate: dateNow,
      updatedAt: listCheckins[0].updatedAt,
      userId: `user_id_0`,
      status: "lacked",
    });
  });
});
