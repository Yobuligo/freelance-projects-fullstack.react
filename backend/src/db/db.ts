import { Sequelize } from "sequelize";
import { AppConfig } from "../AppConfig";

export const db = new Sequelize({
  dialect: AppConfig.DB_DIALECT,
  host: AppConfig.DB_HOST,
  port: AppConfig.DB_PORT,
  database: AppConfig.DB_NAME,
  username: AppConfig.DB_USERNAME,
  password: AppConfig.DB_PASSWORD,
});
