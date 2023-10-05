import { ICheckinTokensRepository } from "@modules/checkin/repositories/ICheckinTokensRepository";
import { CheckinToken } from "@prisma/client";
import { codeGenerator } from "@utils/codeGenerator";
import { inject, injectable } from "tsyringe";

interface IRequest {
  checkinId: string;
}

interface IResponse {
  code: string;
}

@injectable()
export class CreateCheckinCodeUseCase {
  constructor(
    @inject("CheckinTokensRepository")
    private checkinTokensRepository: ICheckinTokensRepository, 
  ){}

  async execute({checkinId}: IRequest): Promise<IResponse> {
    let code = codeGenerator();

    const checkinToken = await this.checkinTokensRepository.findByCode(code);

    if(checkinToken) {
      do { code = codeGenerator(); } while(code === checkinToken.checkin_code);
    }    

    await this.checkinTokensRepository.updateCode({id: checkinId, code});

    return {code};
  }
}