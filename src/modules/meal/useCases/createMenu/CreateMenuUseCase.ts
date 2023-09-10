import { inject, injectable } from "tsyringe";

import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { Menu } from "@modules/menu/infra/entities/Menu";
import { IMenuRepository } from "@modules/menu/repositories/IMenuRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  schedule: Date;
  localID: string;
}

@injectable()
export class CreateMenuUseCase {
  constructor(
    @inject("MenuRepository")
    private menuRepository: IMenuRepository,
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository
  ) {}

  async execute({ schedule, localID }: IRequest): Promise<Menu> {
    const menu = await this.menuRepository.findMenuBySchedule(schedule);

    if (menu) {
      throw new AppError("There is already a scheduled menu", 400);
    }

    const local = await this.locationsRepository.findLocalById(localID);

    if (!local) {
      throw new AppError("Local not found", 404);
    }

    return this.menuRepository.create({ schedule, localID });
  }
}
