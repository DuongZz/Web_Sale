import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_NAME: process.env.DATABASE_NAME,
  SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN,
  SECRET_REFRESH_TOKEN: process.env.SECRET_REFRESH_TOKEN,
};
