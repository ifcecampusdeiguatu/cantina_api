export interface ICreateUserRefreshTokenDTO {
  userId: string;
  refreshToken: string;
  expiresDate: Date;
}
