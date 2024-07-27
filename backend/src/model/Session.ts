import { DataTypes, Model, ModelStatic } from "sequelize";
import { db } from "../db/db";
import { ISession } from "../shared/model/ISession";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { createIdType } from "./createIdType";

export const Session: ModelStatic<Model<ISession, IEntityDetails<ISession>>> =
  db.define("sessions", {
    id: createIdType(),
    expiresAt: DataTypes.DATE,
    userId: DataTypes.STRING,
    username: DataTypes.STRING,
  });
