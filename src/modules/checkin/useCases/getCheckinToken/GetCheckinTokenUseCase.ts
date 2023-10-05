import { ICheckinTokensRepository } from "@modules/checkin/repositories/ICheckinTokensRepository";
import { codeGenerator } from "@utils/codeGenerator";
import { qrcodeGenerator } from "@utils/qrcodeGenerator";
import { inject, injectable } from "tsyringe";

interface IResponse {
  qrcode: string;
  checkinCode: string;
}

@injectable()
export class GetCheckinTokenUseCase {
  constructor(
    @inject('CheckinTokensRepository')
    private checkinTokensRepository: ICheckinTokensRepository
  ){}

  async execute(checkinId): Promise<IResponse> {
    const checkinToken = await this.checkinTokensRepository.findByCheckinId(checkinId);
    
    const qrcode = await qrcodeGenerator(checkinToken.token)

    const code = checkinToken.checkin_code.split('').map((str,index,arr) => {
      const er = /^[0-9]+$/;

      if(er.test(str)){
        const prev = arr[index - 1];

        if(!er.test(prev)) {
          return `-${str}`;
        }
      }

      return str;
    }).join('');

    return {qrcode: qrcode.url, checkinCode: code}
  }
}