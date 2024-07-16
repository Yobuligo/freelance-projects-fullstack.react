import { Dialect } from "sequelize";

export const AppConfig = {
  reloadIntervalMins: 20,
  DB_DIALECT: process.env.DB_DIALECT as Dialect,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT!),
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  SERVER_PORT: parseInt(process.env.SERVER_PORT!),
};
