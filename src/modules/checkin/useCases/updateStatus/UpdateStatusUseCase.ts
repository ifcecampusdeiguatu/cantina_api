import { inject, injectable } from "tsyringe";

import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { IMealsRepository } from "@modules/meal/repositories/IMealsRepository";
import { Status } from "@prisma/client";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  status: Status;
  user: {
    id: string;
    type: string;
  };
}

@injectable()
export class UpdateStatusUseCase {
  constructor(
    @inject("CheckinRepository")
    private checkinRepository: ICheckinRepository,
    @inject("MealsRepository")
    private mealsRepository: IMealsRepository,
    @inject("DayjsProvider")
    private dayjsProvider: IDateProvider
  ) {}

  async execute({ id, status, user }: IRequest, date_start?: Date) {
    const checkin = await this.checkinRepository.findById(id);
    const now = date_start || new Date();
    const isBefore = (init: Date, end: Date) =>
      this.dayjsProvider.compareIfBefore(init, end);

    if (!checkin) {
      throw new AppError("Checkin not found", 404);
    }

    const meal = await this.mealsRepository.findMealById(checkin.mealId);

    const dayDiff = this.dayjsProvider.compareInDays(now, meal.schedule);

    if (dayDiff <= 0 && status === "canceled") {
      const cancelSchedules = [
        this.dayjsProvider.setHours(meal.schedule, {
          hours: 6,
        }),
        this.dayjsProvider.setHours(meal.schedule, {
          hours: 11,
        }),
        this.dayjsProvider.setHours(meal.schedule, {
          hours: 16,
        }),
      ];

      const mealTime = meal.schedule.getUTCHours();

      // +3 timezone offset
      const isMorning = mealTime < 13 + 3;
      const isAfternoon = mealTime >= 13 + 3 && mealTime < 18 + 3;
      const isNight = mealTime >= 18 + 3;

      const isNotCanCancel =
        (isMorning && !isBefore(now, cancelSchedules[0])) ||
        (isAfternoon && !isBefore(now, cancelSchedules[1])) ||
        (isNight && !isBefore(now, cancelSchedules[2]));

      if (isNotCanCancel) {
        throw new AppError("Cancellation deadline has expired", 400);
      }
    }

    if (
      (status === "done" || status === "lacked") &&
      user.type !== "servidor"
    ) {
      throw new AppError("User needs to be a Servidor");
    }

    if (!this.dayjsProvider.compareIfBefore(now, checkin.expiresDate)) {
      await this.checkinRepository.updateStatus({ id, status: "lacked" });
    } else {
      await this.checkinRepository.updateStatus({ id, status });
    }
  }
}
