import { configDotenv } from "dotenv";
import { Sequelize } from "sequelize";
import { AppConfig } from "../AppConfig";

// configDotenv();

export const db = new Sequelize({
  dialect: "mariadb",
  host: "localhost",
  port: 3306,
  database: "freelancer-app",
  username: "root",
  password: "master",
});
