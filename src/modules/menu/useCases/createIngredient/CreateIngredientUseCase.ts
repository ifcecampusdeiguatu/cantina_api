import { inject, injectable } from "tsyringe";

import { Ingredient } from "@modules/menu/infra/entities/Ingredients";
import { IIngredientsRepository } from "@modules/menu/repositories/IIngredientsReposirory";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description?: string;
}

@injectable()
export class CreateIngredientUseCase {
  constructor(
    @inject("IngredientsRepository")
    private ingredientsRepository: IIngredientsRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<Ingredient> {
    const ingredient = await this.ingredientsRepository.findIngredientByName(
      name
    );

    if (ingredient) {
      throw new AppError("Ingredient already exists");
    }

    return this.ingredientsRepository.create({ name, description });
  }
}
