import { CheckinToken } from "@prisma/client";

import { ICreateCheckinTokensDTO } from "../dtos/ICreateCheckinTokensDTO";

export interface ICheckinTokensRepository {
  create({
    checkinId,
    token,
    checkinCode,
  }: ICreateCheckinTokensDTO): Promise<CheckinToken>;
  findByCheckinId(checkinId: string): Promise<CheckinToken>;
  findByCode(code: string): Promise<CheckinToken>;
  update({checkinId, token, checkinCode}: ICreateCheckinTokensDTO): Promise<void>;
  delete(checkinId: string): Promise<void>;
  updateCode({id, code}: { id: string, code?: string | null}): Promise<void>;
}
