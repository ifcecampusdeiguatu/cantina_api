import { ICreateMenuDTO } from "../dtos/ICreateMenuDTO";
import { Menu } from "../infra/entities/Menu";

export interface IMenuRepository {
  create({ schedule }: ICreateMenuDTO): Promise<Menu>;
  findMenuBySchedule(schedule: Date): Promise<Menu>;
}
