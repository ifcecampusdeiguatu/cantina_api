import { inject, injectable } from "tsyringe";

import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";

interface IRequest {
  address: string;
}

@injectable()
export class CreateLocalUseCase {
  constructor(
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository
  ) {}

  async execute({ address }: IRequest) {
    return this.locationsRepository.create({ address });
  }
}
