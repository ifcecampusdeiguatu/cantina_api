import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICheckinTokensRepository } from "@modules/checkin/repositories/ICheckinTokensRepository";
import { qrcodeGenerator } from "@utils/qrcodeGenerator";

interface IResponse {
  qrcode: string;
  checkinCode: string;
}

@injectable()
export class GetCheckinTokenUseCase {
  constructor(
    @inject("CheckinTokensRepository")
    private checkinTokensRepository: ICheckinTokensRepository
  ) {}

  async execute(checkinId): Promise<IResponse> {
    const checkinToken = await this.checkinTokensRepository.findByCheckinId(
      checkinId
    );

    // const dataQrCode = {
    //   token: checkinToken.token,
    //   checkinCode: checkinToken.checkin_code,
    // };

    // const qrcode = await qrcodeGenerator(JSON.stringify(dataQrCode));
    const qrcode = await qrcodeGenerator(
      `${checkinToken.token} ${checkinToken.checkin_code}`
    );

    const code = checkinToken.checkin_code
      .split("")
      .map((str, index, arr) => {
        const er = /^[0-9]+$/;

        if (er.test(str)) {
          const prev = arr[index - 1];

          if (!er.test(prev)) {
            return `-${str}`;
          }
        }

        return str;
      })
      .join("");

    this.createOrRewriteFile("./tmp/qrcode.svg", qrcode.url);

    return { qrcode: qrcode.url, checkinCode: code };
  }

  createOrRewriteFile(filePath: string, content: string): void {
    fs.writeFileSync(filePath, content);
  }
}
