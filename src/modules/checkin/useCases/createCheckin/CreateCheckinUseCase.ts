import { inject, injectable } from "tsyringe";

import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { Status } from "@modules/checkin/types";

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
    private checkinRepository: ICheckinRepository
  ) {}

  async execute({ id, status, mealId, userId }: IRequest) {
    await this.checkinRepository.create({ id, status, mealId, userId });
  }
}
