import { inject, injectable } from "tsyringe";

import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { Meal } from "@modules/meal/infra/entities/Meal";
import { IDishesRepository } from "@modules/meal/repositories/IDishesRepository";
import { IMealsRepository } from "@modules/meal/repositories/IMealsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  schedule: Date;
  localId: string;
  dishId: string;
}

@injectable()
export class CreateMealUseCase {
  constructor(
    @inject("MealsRepository")
    private MealsRepository: IMealsRepository,
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository,
    @inject("DishesRepository")
    private dishesRepository: IDishesRepository
  ) {}

  async execute({ schedule, localId, dishId }: IRequest): Promise<Meal> {
    const menu = await this.MealsRepository.findMealBySchedule(schedule);

    if (menu) {
      throw new AppError("There is already a scheduled meal", 400);
    }

    const local = await this.locationsRepository.findLocalById(localId);

    if (!local) {
      throw new AppError("Local not found", 404);
    }

    const dish = await this.dishesRepository.findDishById(dishId);

    if (!dish) {
      throw new AppError("Dish not found", 404);
    }

    return this.MealsRepository.create({ schedule, localId, dishId });
  }
}
