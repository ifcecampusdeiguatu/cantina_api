import { Local } from "../infra/entities/Local";

export interface ICreateLocalDTO {
  address: string;
}

export interface ILocationsRepository {
  create({ address }: ICreateLocalDTO): Promise<Local>;
  findLocalById(id: string): Promise<Local>;
  list(): Promise<Local[]>;
}
