import { ICreateMealDTO } from "../dtos/ICreateMealDTO";
import { Meal } from "../infra/entities/Meal";

export interface IMealsRepository {
  create({ schedule, localId, dishId }: ICreateMealDTO): Promise<Meal>;
  findMealBySchedule(schedule: Date): Promise<Meal>;
  findMealById(id: string): Promise<Meal>;
}
