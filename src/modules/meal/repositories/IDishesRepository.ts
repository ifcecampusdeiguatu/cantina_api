import { IAddIngredientToDishDTO } from "../dtos/IAddIngredientToDishDTO";
import { ICreateDishDTO } from "../dtos/ICreateDishDTO";
import { Dish } from "../infra/entities/Dish";

export interface IDishesRepository {
  create({ name, description }: ICreateDishDTO): Promise<Dish>;
  addIngredientToDish({
    dishId,
    ingredientId,
  }: IAddIngredientToDishDTO): Promise<Dish>;
  findDishById(id: string): Promise<Dish>;
}
