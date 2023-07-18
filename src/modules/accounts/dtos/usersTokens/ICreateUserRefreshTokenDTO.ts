export interface ICreateUserRefreshTokenDTO {
  userId: string;
  refreshToken: string;
  expiresDate: Date;
  token: string;
}
