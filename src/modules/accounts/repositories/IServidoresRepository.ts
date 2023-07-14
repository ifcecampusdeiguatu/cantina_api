import { Servidor } from "@prisma/client";

import { ICreateServidorDTO } from "../dtos/servidores/ICreateServidorDTO";

export interface IServidoresRepository {
  create({ siape, role, name, userId }: ICreateServidorDTO): Promise<void>;
  findServidorBySIAPE(siape: string): Promise<Servidor>;
  findServidorBySIAPEOrUserId(
    siape?: string,
    userId?: string
  ): Promise<Servidor>;
}
