import { DataTypes, Model, ModelStatic } from "sequelize";
import { db } from "../db/db";
import { ISession } from "../shared/model/ISession";
import { IEntityDetails } from "../shared/types/IEntityDetails";

export const Sessions: ModelStatic<Model<ISession, IEntityDetails<ISession>>> =
  db.define("sessions", {
    userId: DataTypes.STRING,
    username: DataTypes.STRING,
  });
