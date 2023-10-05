import { Status } from "@prisma/client";

export interface IUpdateStatusCheckinDTO {
  id: string;
  status: Status;
}
