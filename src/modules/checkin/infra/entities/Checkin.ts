import { Status } from "@modules/checkin/types";

export class Checkin {
  id: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  menuId: string;
}
