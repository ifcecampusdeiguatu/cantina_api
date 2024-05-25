export type IDeleteAlunoDTO =
  | { userId: string; cpf?: never }
  | { cpf: string; userId?: never };
