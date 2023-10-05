import { inject, injectable } from "tsyringe";

import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { Menu } from "@modules/meal/infra/entities/Menu";
import { IMealRepository } from "@modules/meal/repositories/IMealRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  schedule: Date;
  localID: string;
}

@injectable()
export class CreateMenuUseCase {
  constructor(
    @inject("MealRepository")
    private mealRepository: IMealRepository,
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository
  ) {}

  async execute({ schedule, localID }: IRequest): Promise<Menu> {
    const menu = await this.mealRepository.findMealBySchedule(schedule);

    if (menu) {
      throw new AppError("There is already a scheduled menu", 400);
    }

    const local = await this.locationsRepository.findLocalById(localID);

    if (!local) {
      throw new AppError("Local not found", 404);
    }

    return this.mealRepository.create({ schedule, localID });
  }
}
