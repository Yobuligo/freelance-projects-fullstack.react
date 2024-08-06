import { Sequelize } from "sequelize";

export const db = new Sequelize({
  dialect: "mariadb",
  host: "raspberry",
  port: 3306,
  database: "freelancer-app",
  username: "root",
  password: "master",
});
