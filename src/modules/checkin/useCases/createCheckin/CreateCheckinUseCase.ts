import { inject, injectable } from "tsyringe";

import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { Status } from "@modules/checkin/types";

interface IRequest {
  id?: string;
  status: Status;
  menuId: string;
  userId: string;
}

@injectable()
export class CreateCheckinUseCase {
  constructor(
    @inject("CheckinRepository")
    private checkinRepository: ICheckinRepository
  ) {}

  async execute({ id, status, menuId, userId }: IRequest) {
    await this.checkinRepository.create({ id, status, menuId, userId });
  }
}
