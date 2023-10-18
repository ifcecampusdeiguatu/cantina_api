import { ICreateCheckinDTO } from "@modules/checkin/dtos/ICreateCheckinDTO";
import { IUpdateStatusCheckinDTO } from "@modules/checkin/dtos/IUpdateStatusCheckinDTO";
import { Checkin } from "@modules/checkin/infra/entities/Checkin";

import { ICheckinRepository } from "../ICheckinRepository";

export class CheckinRepositoryInMemory implements ICheckinRepository {
  checkins: Checkin[] = [];

  async create({
    mealId,
    userId,
    status,
    expiresDate,
  }: ICreateCheckinDTO): Promise<Checkin> {
    const checkin = new Checkin();

    Object.assign(checkin, {
      status,
      mealId,
      userId,
      expiresDate,
    });

    this.checkins.push(checkin);

    return checkin;
  }

  async list(): Promise<Checkin[]> {
    return this.checkins;
  }

  async findById(id: string): Promise<Checkin> {
    const checkin = this.checkins.find((checkin) => checkin.id === id);

    return checkin;
  }

  async updateStatus({ id, status }: IUpdateStatusCheckinDTO): Promise<void> {
    const indexOfCheckin = this.checkins.findIndex(
      (checkin) => checkin.id === id
    );

    this.checkins[indexOfCheckin].status = status;
    this.checkins[indexOfCheckin].updatedAt = new Date();
  }

  async delete(id: string): Promise<void> {
    const indexOfCheckin = this.checkins.findIndex(
      (checkin) => checkin.id === id
    );

    this.checkins.slice(indexOfCheckin);
  }
}
