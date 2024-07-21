import { DataTypes, Model, ModelStatic } from "sequelize";
import { db } from "../db/db";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { IUser } from "./IUser";

export const Users: ModelStatic<Model<IUser, IEntityDetails<IUser>>> =
  db.define("users", {
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    username: DataTypes.STRING,
  });
