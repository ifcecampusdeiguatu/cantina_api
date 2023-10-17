import { Local } from "@modules/locations/infra/entities/Local";

import { ICreateLocalDTO, ILocationsRepository } from "../ILocationsRepository";

export class LocationsRepositoryInMemory implements ILocationsRepository {
  locations: Local[] = [];

  async create({ address }: ICreateLocalDTO): Promise<Local> {
    const local = new Local();

    Object.assign(local, {
      address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.locations.push(local);

    return local;
  }

  async findLocalById(id: string): Promise<Local> {
    return this.locations.find((loc) => loc.id === id);
  }

  async list(): Promise<Local[]> {
    return this.locations;
  }
}
