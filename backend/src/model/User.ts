import {
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  ModelStatic,
} from "sequelize";
import { db } from "../db/db";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { createIdType } from "./createIdType";
import { IUser } from "./IUser";
import { UserProject } from "./UserProject";
import { UserProviderRequest } from "./UserProviderRequest";

const user: ModelStatic<Model<IUser, IEntityDetails<IUser>>> = db.define(
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

export class User extends user {
  declare getUserProjects: HasManyGetAssociationsMixin<UserProject>;
  declare getUserProviderRequests: HasManyGetAssociationsMixin<UserProviderRequest>;
}
