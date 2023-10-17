import { v4 as uuid } from "uuid";

import { Ingredient } from "./Ingredients";
import { Meal } from "./Meal";

export class Dish {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;

  meals?: Meal[];
  ingredients?: Ingredient[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
