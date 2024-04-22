export interface ICreateUserDTO {
  id?: string;
  email?: string;
  password: string;
  type?: "aluno" | "funcionario" | "servidor";
}
