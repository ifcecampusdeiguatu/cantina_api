import { inject, injectable } from "tsyringe";

import { Dish } from "@modules/meal/infra/entities/Dish";
import { IDishesRepository } from "@modules/meal/repositories/IDishesRepository";

interface IRequest {
  name: string;
  description?: string;
}

@injectable()
export class CreateDishUseCase {
  constructor(
    @inject("DishesRepository")
    private dishesRepository: IDishesRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<Dish> {
    return this.dishesRepository.create({ name, description });
  }
}
