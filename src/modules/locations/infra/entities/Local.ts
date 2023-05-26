import { v4 as uuid } from "uuid";

export class Local {
  id?: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    if (this.id == null) {
      this.id = uuid();
    }
  }
}
