import { Dish } from "@prisma/client";

import { IAddIngredientToFoodDTO } from "../dtos/IAddIngredientToFoodDTO";
import { ICreateFoodDTO } from "../dtos/ICreateFoodDTO";

export interface IFoodsRepository {
  create({ name, description }: ICreateFoodDTO): Promise<Dish>;
  addIngredientToFood({
    foodID,
    ingredientID,
  }: IAddIngredientToFoodDTO): Promise<Dish>;
  findFoodById(id: string): Promise<Dish>;
}
