import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { ICheckinTokensRepository } from "@modules/checkin/repositories/ICheckinTokensRepository";
import { Checkin } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetCheckinByCodeUseCase {
  constructor(
    @inject('CheckinTokensRepository')
    private checkinTokensRepository: ICheckinTokensRepository,
    @inject('CheckinRepository')
    private checkinRepository: ICheckinRepository,
  ){}
  async execute(code: string): Promise<Checkin>{
    const checkinToken = await this.checkinTokensRepository.findByCode(code);
    
    if(!checkinToken){
      throw new AppError("Code invalid");
    }

    await this.checkinTokensRepository.updateCode({id: checkinToken.checkinId, code: null})
    
    return await this.checkinRepository.findById(checkinToken.checkinId);
  }
}