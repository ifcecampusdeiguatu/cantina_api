import { Meal } from "@prisma/client";

import { ICreateMealDTO } from "../dtos/ICreateMealDTO";

export interface IMealRepository {
  create({ schedule }: ICreateMealDTO): Promise<Meal>;
  findMealBySchedule(schedule: Date): Promise<Meal>;
  findMealById(id: string): Promise<Meal>;
}
