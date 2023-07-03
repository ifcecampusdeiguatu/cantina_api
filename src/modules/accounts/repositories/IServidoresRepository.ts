import { Servidor } from "@prisma/client";

import { ICreateServidorDTO } from "../dtos/servidores/ICreateServidorDTO";

export interface IServidoresRepository {
  create({ siape, role, name, userId }: ICreateServidorDTO): Promise<void>;
  findFuncionarioBySIAPE(siape: string): Promise<Servidor>;
}
