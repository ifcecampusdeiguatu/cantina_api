import { Checkin } from "@prisma/client";

import { ICreateCheckinDTO } from "../dtos/ICreateCheckinDTO";
import { IUpdateStatusCheckinDTO } from "../dtos/IUpdateStatusCheckinDTO";

export interface ICheckinRepository {
  create({ id, status, mealId, userId, expiresDate }: ICreateCheckinDTO): Promise<void>;
  list(): Promise<Checkin[]>;
  findById(id: string): Promise<Checkin>;
  updateStatus({id, status}: IUpdateStatusCheckinDTO ): Promise<void>;
  delete(id: string): Promise<void>;
}
