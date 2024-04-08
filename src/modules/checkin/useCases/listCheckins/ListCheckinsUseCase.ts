import { inject, injectable } from "tsyringe";

import { Checkin } from "@modules/checkin/infra/entities/Checkin";
import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { IMealsRepository } from "@modules/meal/repositories/IMealsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
// import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListCheckinsUseCase {
  constructor(
    @inject("CheckinRepository")
    private checkinRepository: ICheckinRepository,
    @inject("DayjsProvider")
    private dayjsProvider: IDateProvider,
    @inject("MealsRepository")
    private mealsRepository: IMealsRepository
  ) {}

  async execute(): Promise<Checkin[]> {
    const updates: Array<Promise<void>> = [];

    const checkins = await this.checkinRepository.list();

    for (let i = 0; i < checkins.length; i += 1) {
      const isExpires = !this.dayjsProvider.compareIfBefore(
        new Date(),
        checkins[i].expiresDate
      );

      if (isExpires) {
        checkins[i].status = "lacked";

        updates.push(
          this.checkinRepository.updateStatus({
            id: checkins[i].id,
            status: "lacked",
          })
        );
      }
    }

    await Promise.all(updates);

    return checkins;
  }
}
