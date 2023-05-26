import { Food } from "@prisma/client";

import { IAddIngredientToFoodDTO } from "../dtos/IAddIngredientToFoodDTO";
import { ICreateFoodDTO } from "../dtos/ICreateFoodDTO";

export interface IFoodsRepository {
  create({ name, description }: ICreateFoodDTO): Promise<Food>;
  addIngredientToFood({
    foodID,
    ingredientID,
  }: IAddIngredientToFoodDTO): Promise<Food>;
  findFoodById(id: string): Promise<Food>;
}
