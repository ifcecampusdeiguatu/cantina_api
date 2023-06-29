import { ICreateCheckinDTO } from "../dtos/ICreateCheckinDTO";

export interface ICheckinRepository {
  create({ id, status, menuId, userId }: ICreateCheckinDTO): Promise<void>;
}
