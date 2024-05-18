import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_NAME: process.env.DATABASE_NAME,
  SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN,
  SECRET_REFRESH_TOKEN: process.env.SECRET_REFRESH_TOKEN,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  REACT_GEARVN_CLONE_HOST: process.env.REACT_GEARVN_CLONE_HOST,
  REACT_GEARVN_ADMIN_HOST: process.env.REACT_GEARVN_ADMIN_HOST,
  COOKIE_IS_USE_SECURE: process.env.COOKIE_IS_USE_SECURE
};
