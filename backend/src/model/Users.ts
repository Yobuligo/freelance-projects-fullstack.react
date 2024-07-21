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

const users: ModelStatic<Model<IUser, IEntityDetails<IUser>>> = db.define(
  "users",
  {
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    username: DataTypes.STRING,
  }
);

export class Users extends users {
  declare getUserProjects: HasManyGetAssociationsMixin<UserProjects>;
}
