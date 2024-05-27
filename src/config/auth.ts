export default {
  secret_token: process.env.SECRET_TOKEN,
  secret_refresh_token: process.env.SECRET_REFRESH_TOKEN,
  expires_in_token: "60m",
  expires_in_refresh_token: "7d",
  expires_refresh_token_days: 7,
};
