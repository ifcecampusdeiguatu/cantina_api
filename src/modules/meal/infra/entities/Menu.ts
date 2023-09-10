import { v4 as uuid } from "uuid";

import { Food } from "./Food";

export class Menu {
  id: string;
  schedule: Date;
  createdAt: Date;
  updatedAt: Date;
  localID: string;

  food?: Food[];
  foodId?: string;

  constructor() {
    if (this.id == null) {
      this.id = uuid();
    }
  }
}
