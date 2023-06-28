export interface ICreateUserDTO {
  email: string;
  password: string;
  type?: "aluno" | "funcionario" | "servidor";
}
