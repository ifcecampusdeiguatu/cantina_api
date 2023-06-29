import { Status } from "@prisma/client";

export interface ICreateCheckinDTO {
  id?: string;
  status?: Status;
  userId: string;
  menuId: string;
}
