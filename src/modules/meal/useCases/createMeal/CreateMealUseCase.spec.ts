import "reflect-metadata";

import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { LocationsRepositoryInMemory } from "@modules/locations/repositories/in-memory/LocationsRepositoryInMemory";
import { IDishesRepository } from "@modules/meal/repositories/IDishesRepository";
import { IMealsRepository } from "@modules/meal/repositories/IMealsRepository";
import { DishesRepositoryInMemory } from "@modules/meal/repositories/in-memory/DishesRepositoryInMemory";
import { MealsRepositoryInMemory } from "@modules/meal/repositories/in-memory/MealRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateMealUseCase } from "./CreateMealUseCase";

let mealsRepositoryInMemory: IMealsRepository;
let locationsRepositoryInMemory: ILocationsRepository;
let dishesRepositoryInMemory: IDishesRepository;
let createMealUseCase: CreateMealUseCase;

describe("Create Meal", () => {
  beforeAll(() => {
    mealsRepositoryInMemory = new MealsRepositoryInMemory();
    locationsRepositoryInMemory = new LocationsRepositoryInMemory();
    dishesRepositoryInMemory = new DishesRepositoryInMemory();
    createMealUseCase = new CreateMealUseCase(
      mealsRepositoryInMemory,
      locationsRepositoryInMemory,
      dishesRepositoryInMemory
    );
  });

  it("should be to create a new Meal", async () => {
    const local = await locationsRepositoryInMemory.create({
      address: "Rua A",
    });

    const dish = await dishesRepositoryInMemory.create({
      name: "Dish 01",
      description: "Description Dish",
    });

    const schedule = new Date();

    const meal = await createMealUseCase.execute({
      schedule,
      dishId: dish.id,
      localId: local.id,
    });

    expect(meal).toHaveProperty("id");
    expect(meal.schedule).toEqual(schedule);
    expect(meal.localId).toEqual(local.id);
    expect(meal.dishId).toEqual(dish.id);
  });

  it("should not be possible to create a meal with the same schedule", async () => {
    const local = await locationsRepositoryInMemory.create({
      address: "Rua A",
    });

    const dish = await dishesRepositoryInMemory.create({
      name: "Dish 01",
      description: "Description Dish",
    });

    const schedule = new Date();

    await createMealUseCase.execute({
      schedule,
      dishId: dish.id,
      localId: local.id,
    });

    await expect(
      createMealUseCase.execute({
        schedule,
        dishId: dish.id,
        localId: local.id,
      })
    ).rejects.toEqual(new AppError("There is already a scheduled meal"));
  });

  it("should not be possible to create a meal with non-existent location", async () => {
    const dish = await dishesRepositoryInMemory.create({
      name: "Dish 01",
      description: "Description Dish",
    });

    await expect(
      createMealUseCase.execute({
        dishId: dish.id,
        localId: "null_local_id",
        schedule: new Date(),
      })
    ).rejects.toEqual(new AppError("Local not found", 404));
  });

  it("should not be possible to create a meal without dish", async () => {
    const local = await locationsRepositoryInMemory.create({
      address: "Rua A",
    });

    await expect(
      createMealUseCase.execute({
        dishId: "null_dish_id",
        localId: local.id,
        schedule: new Date(),
      })
    ).rejects.toEqual(new AppError("Dish not found", 404));
  });
});
