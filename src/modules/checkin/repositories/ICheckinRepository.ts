import { ICreateCheckinDTO } from "../dtos/ICreateCheckinDTO";
import { IUpdateStatusCheckinDTO } from "../dtos/IUpdateStatusCheckinDTO";
import { Checkin } from "../infra/entities/Checkin";

export interface ICheckinRepository {
  create({ ...data }: ICreateCheckinDTO): Promise<Checkin>;
  list(): Promise<Checkin[]>;
  findById(id: string): Promise<Checkin>;
  updateStatus({ id, status }: IUpdateStatusCheckinDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
