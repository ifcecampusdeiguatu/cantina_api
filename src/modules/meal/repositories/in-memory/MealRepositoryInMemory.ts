import { ICreateMealDTO } from "@modules/meal/dtos/ICreateMealDTO";
import { Meal } from "@modules/meal/infra/entities/Meal";

import { IMealsRepository } from "../IMealsRepository";

export class MealsRepositoryInMemory implements IMealsRepository {
  meals: Meal[] = [];

  async create({ schedule, localId, dishId }: ICreateMealDTO): Promise<Meal> {
    const meal = new Meal();

    Object.assign(meal, {
      schedule,
      localId,
      dishId,
    });

    this.meals.push(meal);

    return meal;
  }

  async findMealBySchedule(schedule: Date): Promise<Meal> {
    return this.meals.find((meal) => meal.schedule === schedule);
  }

  async findMealById(id: string): Promise<Meal> {
    return this.meals.find((meal) => meal.id === id);
  }
}
