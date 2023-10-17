import { IAddIngredientToDishDTO } from "@modules/meal/dtos/IAddIngredientToDishDTO";
import { ICreateDishDTO } from "@modules/meal/dtos/ICreateDishDTO";
import { Dish } from "@modules/meal/infra/entities/Dish";

import { IDishesRepository } from "../IDishesRepository";

export class DishesRepositoryInMemory implements IDishesRepository {
  dishes: Dish[] = [];

  async create({ name, description }: ICreateDishDTO): Promise<Dish> {
    const dish = new Dish();

    Object.assign(dish, {
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.dishes.push(dish);

    return dish;
  }

  async addIngredientToDish({
    dishId,
    ingredientId,
  }: IAddIngredientToDishDTO): Promise<Dish> {
    const ingredient = this.dishes.find((dish) => {
      return dish.ingredients.find(
        (ingredient) => ingredient.id === ingredientId
      );
    });

    const indexOfDish = this.dishes.findIndex((dish) => dish.id === dishId);

    this.dishes[indexOfDish].ingredients.push(ingredient);

    return this.dishes[indexOfDish];
  }

  async findDishById(id: string): Promise<Dish> {
    return this.dishes.find((dish) => dish.id === id);
  }
}
