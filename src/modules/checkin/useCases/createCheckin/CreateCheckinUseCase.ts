import { inject, injectable } from "tsyringe";

import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { Status } from "@modules/checkin/types";
import { IMealsRepository } from "@modules/meal/repositories/IMealsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id?: string;
  status: Status;
  mealId: string;
  userId: string;
}

@injectable()
export class CreateCheckinUseCase {
  constructor(
    @inject("CheckinRepository")
    private checkinRepository: ICheckinRepository,
    @inject("MealsRepository")
    private MealsRepository: IMealsRepository,
    @inject("DayjsProvider")
    private dayjsProvider: IDateProvider
  ) {}

  async execute({ id, status, mealId, userId }: IRequest) {
    const meal = await this.MealsRepository.findMealById(mealId);

    const dateNow = this.dayjsProvider.dateNow();
    const expiresDate = this.dayjsProvider.setHours(dateNow, {
      hours: 23,
      minutes: 59,
      seconds: 59,
    });

    if (!meal) {
      throw new AppError("Meal not found");
    }

    const compareDays = this.dayjsProvider.compareInDays(
      dateNow,
      meal.schedule
    );

    if (compareDays === 0 || compareDays > 1) {
      throw new AppError("Checkin não está disponível", 400);
    }

    await this.checkinRepository.create({
      id,
      status,
      mealId,
      userId,
      expiresDate,
    });
  }
}
