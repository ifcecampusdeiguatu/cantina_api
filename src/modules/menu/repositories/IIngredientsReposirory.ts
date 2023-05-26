import { ICreateIngredientsDTO } from "../dtos/ICreateIngredientsDTO";
import { Ingredient } from "../infra/entities/Ingredients";

export interface IIngredientsRepository {
  create({ name, description }: ICreateIngredientsDTO): Promise<Ingredient>;
  findIngredientByName(name: string): Promise<Ingredient>;
  findIngredientByID(id: string): Promise<Ingredient>;
}
