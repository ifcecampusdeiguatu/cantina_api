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
    private dayjsProvider: IDateProvider,
  ) {}

  async execute(): Promise<Checkin[]> {
    const checkins = await this.checkinRepository.list();

    for (const checkin of checkins) {
      if(!this.dayjsProvider.compareIfBefore(new Date(), checkin.expiresDate)){
        await this.checkinRepository.updateStatus({id: checkin.id, status:"lacked"});
      }
    }

    return this.checkinRepository.list();
  }
}
