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
  COOKIE_IS_USE_SECURE: process.env.COOKIE_IS_USE_SECURE,
  //zalo
  ZALO_API_KEY: process.env.ZALO_API_ID,
  ZALO_KEY_1: process.env.ZALO_KEY_1,
  ZALO_KEY_2: process.env.ZALO_KEY_2,
  ZALO_ENDPOINT: process.env.ENDPOINT_ZALO,
  ZALO_CALLBACK: process.env.ZALO_CALLBACK,
  //momo
  MOMO_ACCESS_KEY: process.env.MOMO_ACCESS_KEY,
  MOMO_SECRET_KEY: process.env.MOMO_SECRET_KEY,
  REDIRECT_URL_MOMO: process.env.REDIRECT_URL_MOMO,
  IPN_URL_MOMO: process.env.IPN_URL_MOMO,
  ENDPOINT_MOMO: process.env.ENDPOINT_MOMO,
  //email
  SENDER_EMAIL: process.env.SENDER_EMAIL,
  PASS_APP: process.env.PASS_APP,
  HOST_MAIL: process.env.HOST_MAIL,
};
