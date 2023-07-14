import { Funcionario } from "@prisma/client";

import { ICreateFuncionarioDTO } from "../dtos/funcionarios/ICreateFuncionarioDTO";

export interface IFuncionariosRepository {
  create({ role, name, userId }: ICreateFuncionarioDTO): Promise<void>;
  findFuncionarioByID(id: string): Promise<Funcionario>;
  findFuncionarioByUserId(userId: string): Promise<Funcionario>;
}
