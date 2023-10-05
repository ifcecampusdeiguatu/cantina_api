import { inject, injectable } from "tsyringe";

import { ICreateCheckinTokensDTO } from "@modules/checkin/dtos/ICreateCheckinTokensDTO";
import { ICheckinTokensRepository } from "@modules/checkin/repositories/ICheckinTokensRepository";
import { CheckinToken, PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

@injectable()
export class CheckinTokensRepository implements ICheckinTokensRepository {
  repository: PrismaClient;

  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }
  
  async findByCode(code: string): Promise<CheckinToken> {
    const checkinToken = await this.repository.checkinToken.findFirst({where: {checkin_code: code}});

    return checkinToken;
  }
  
  async create({
    checkinId,
    token,
    checkinCode,
  }: ICreateCheckinTokensDTO): Promise<CheckinToken> {
    const checkiToken = await this.repository.checkinToken.create({
      data: {
        checkinId,
        token,
        checkin_code: checkinCode,
      },
    });
    
    
    return checkiToken;
  }
  
  async findByCheckinId(checkinId: string): Promise<CheckinToken> {
    return this.repository.checkinToken.findFirst({where: {checkinId: checkinId}});
  }

  async update({ checkinId, token, checkinCode }: ICreateCheckinTokensDTO): Promise<void> {
    await this.repository.checkinToken.update({where: {checkinId}, data: {token, checkin_code: checkinCode}});
  }

  async delete(checkinId: string): Promise<void> {
    await this.repository.checkinToken.delete({where: {checkinId}});
  }

  async updateCode({id, code}: { id: string, code: string | null}): Promise<void> {
    await this.repository.checkinToken.update({where: { checkinId: id}, data: {checkin_code: code}});
  }
}
