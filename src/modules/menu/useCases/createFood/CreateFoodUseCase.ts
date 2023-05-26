import { inject, injectable } from "tsyringe";

import { Food } from "@modules/menu/infra/entities/Food";
import { IFoodsRepository } from "@modules/menu/repositories/IFoodsRepository";

interface IRequest {
  name: string;
  description?: string;
}

@injectable()
export class CreateFoodUseCase {
  constructor(
    @inject("FoodsRepository")
    private foodsRepository: IFoodsRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<Food> {
    return this.foodsRepository.create({ name, description });
  }
}
