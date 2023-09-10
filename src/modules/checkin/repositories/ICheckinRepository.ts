import { ICreateCheckinDTO } from "../dtos/ICreateCheckinDTO";

export interface ICheckinRepository {
  create({ id, status, mealId, userId }: ICreateCheckinDTO): Promise<void>;
}
