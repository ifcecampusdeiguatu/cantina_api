// import { ICreateCheckinTokensDTO } from "@modules/checkin/dtos/ICreateCheckinTokensDTO";
// import { CheckinToken } from "@prisma/client";

// import { ICheckinTokensRepository } from "../ICheckinTokensRepository";

// export class CheckinTokensRepositoryInMemory
//   implements ICheckinTokensRepository
// {
//   create({
//     checkinId,
//     token,
//     checkinCode,
//   }: ICreateCheckinTokensDTO): Promise<CheckinToken> {
//     throw new Error("Method not implemented.");
//   }
//   findByCheckinId(checkinId: string): Promise<CheckinToken> {
//     throw new Error("Method not implemented.");
//   }
//   findByCode(code: string): Promise<CheckinToken> {
//     throw new Error("Method not implemented.");
//   }
//   update({
//     checkinId,
//     token,
//     checkinCode,
//   }: ICreateCheckinTokensDTO): Promise<void> {
//     throw new Error("Method not implemented.");
//   }
//   delete(checkinId: string): Promise<void> {
//     throw new Error("Method not implemented.");
//   }
//   updateCode({ id, code }: { id: string; code?: string }): Promise<void> {
//     throw new Error("Method not implemented.");
//   }
// }
