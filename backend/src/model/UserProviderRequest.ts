import { DataTypes, Model, ModelStatic } from "sequelize";
import { db } from "../db/db";
import { IUserProviderRequest } from "../shared/model/IUserProviderRequest";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { createIdType } from "./createIdType";
import { User } from "./User";

const userProviderRequest: ModelStatic<
  Model<IUserProviderRequest, IEntityDetails<IUserProviderRequest>>
> = db.define("user-provider-requests", {
  id: createIdType(),
  userId: DataTypes.STRING,
  enabled: DataTypes.BOOLEAN,
  provider: DataTypes.STRING,
  title: DataTypes.STRING,
  url: DataTypes.STRING,
});

export class UserProviderRequest extends userProviderRequest {}

User.hasMany(UserProviderRequest);
UserProviderRequest.belongsTo(User);
