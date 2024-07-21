import { Dialect } from "sequelize";

export const AppConfig = {
  reloadIntervalMins: 20,
  DB_DIALECT: process.env.DB_DIALECT as Dialect,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT!),
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  PEPPER: "c894eed9031e71867d76ca1784fadb0a87ca7cd4b83e2c5603a818d2616576f8",
  SERVER_PORT: parseInt(process.env.SERVER_PORT!),
  NEW_IMPLEMENTATION: process.env.NEW_IMPLEMENTATION,
};
