import { v4 as uuid } from "uuid";

import { Dish } from "./Dish";

export class Meal {
  id: string;
  schedule: Date;
  createdAt: Date;
  updatedAt: Date;
  localId: string;

  dishes?: Dish[];
  dishId: string;

  constructor() {
    if (this.id == null) {
      this.id = uuid();
    }
  }
}
