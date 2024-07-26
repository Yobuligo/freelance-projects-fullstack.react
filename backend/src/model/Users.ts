import {
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  ModelStatic,
} from "sequelize";
import { db } from "../db/db";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { IUser } from "./IUser";
import { UserProjects } from "./UserProjects";
import { createIdType } from "./createIdType";

const users: ModelStatic<Model<IUser, IEntityDetails<IUser>>> = db.define(
  "users",
  {
    id: createIdType(),
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    salt: DataTypes.STRING,
  }
);

export class Users extends users {
  declare getUserProjects: HasManyGetAssociationsMixin<UserProjects>;
}
