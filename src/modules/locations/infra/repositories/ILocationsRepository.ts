import { Local } from "../entities/Local";

interface ICreateLocalDTO {
  address: string;
}

export interface ILocationsRepository {
  create({ address }: ICreateLocalDTO): Promise<Local>;
  findLocalById(id: string): Promise<Local>;
}
