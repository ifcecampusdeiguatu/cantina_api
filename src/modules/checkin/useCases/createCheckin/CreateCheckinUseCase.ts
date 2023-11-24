import { inject, injectable } from "tsyringe";

import { Checkin } from "@modules/checkin/infra/entities/Checkin";
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

  async execute(
    { id, mealId, status, userId }: IRequest,
    date_start?: Date
  ): Promise<Checkin> {
    const meal = await this.MealsRepository.findMealById(mealId);

    const dateNow = date_start || new Date();

    const daysToExpires = this.dayjsProvider.compareInDays(
      dateNow,
      meal.schedule
    );

    const lastDay = this.dayjsProvider.addDays(dateNow, daysToExpires - 1);

    const expiresDate = this.dayjsProvider.setHours(lastDay, {
      hours: 23,
      minutes: 59,
      seconds: 59,
    });

    if (!meal) {
      throw new AppError("Meal not found");
    }

    if (daysToExpires <= 0) {
      throw new AppError("Meal unavailable for check in", 400);
    }

    if (daysToExpires > 5) {
      throw new AppError("Meal not yet available for check-in");
    }

    const checkin = await this.checkinRepository.create({
      id,
      mealId,
      userId,
      status,
      expiresDate,
    });

    return checkin;
  }
}
