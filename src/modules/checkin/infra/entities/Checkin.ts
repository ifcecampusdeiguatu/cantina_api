import { v4 as uuid } from "uuid";

import { Status } from "@modules/checkin/types";

export class Checkin {
  id: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  expiresDate: Date;
  userId: string;
  mealId: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
