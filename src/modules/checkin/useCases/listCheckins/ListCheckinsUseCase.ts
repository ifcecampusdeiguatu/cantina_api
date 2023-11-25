import { inject, injectable } from "tsyringe";

import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { Checkin } from "@prisma/client";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

@injectable()
export class ListCheckinsUseCase {
  constructor(
    @inject("CheckinRepository")
    private checkinRepository: ICheckinRepository,
    @inject("DayjsProvider")
    private dayjsProvider: IDateProvider
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

    return this.checkinRepository.list();
  }
}
