import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { ICheckinTokensRepository } from "@modules/checkin/repositories/ICheckinTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { codeGenerator } from "@utils/codeGenerator";

@injectable()
export class CreateCheckinTokenUseCase {
  constructor(
    @inject("CheckinTokensRepository")
    private checkinTokensRepository: ICheckinTokensRepository,
    @inject("CheckinRepository")
    private checkinRepository: ICheckinRepository,
    @inject("DayjsProvider")
    private dayjsProvider: IDateProvider
  ) {}

  async execute(checkinId: string): Promise<void> {
    const checkin = await this.checkinRepository.findById(checkinId);
    const dateNow = new Date();

    const minutes = this.dayjsProvider.compareInMinutes(
      dateNow,
      checkin.expiresDate
    );

    if (minutes < 0) {
      throw new AppError("Checkin has expired");
    }

    const checkinSubject = {
      checkinId: checkin.id,
      userId: checkin.userId,
      mealId: checkin.mealId,
    };

    const checkinCode = codeGenerator();

    const token = sign({ checkinSubject }, checkinCode, {
      subject: checkin.id,
      expiresIn: `${minutes}m`,
    });

    await this.checkinTokensRepository.create({
      checkinId,
      token,
      checkinCode,
    });
  }
}
