import { inject, injectable } from "tsyringe";

import { Local } from "@modules/locations/infra/entities/Local";
import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";

@injectable()
export class ListLocationsUseCase {
  constructor(
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository
  ) {}

  async execute(): Promise<Local[]> {
    return this.locationsRepository.list();
  }
}
