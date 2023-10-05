import * as QRCode from "qrcode";

type QrCodeData = { url: string };

export async function qrcodeGenerator(data: string): Promise<QrCodeData> {
  const qr = await new Promise<string>((resolve, reject) => {
    QRCode.toString(data, {type: "svg"},(err, string) => {
      if (err) {
        reject(err);
      } else {
        resolve(string);
      }
    })
  })

  return { url: qr.replace(/"/g, '\'')}
}