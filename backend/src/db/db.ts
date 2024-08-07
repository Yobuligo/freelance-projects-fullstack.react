import { Sequelize } from "sequelize";

export const db = new Sequelize({
  dialect: "mariadb",
  host: "localhost",
  port: 3306,
  database: "freelancer-app",
  username: "root",
  password: "master",
});
