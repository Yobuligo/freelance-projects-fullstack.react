import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
  ModelStatic,
} from "sequelize";
import { db } from "../../db/db";
import { IUserOpportunity } from "../../shared/model/IUserOpportunity";
import { IEntityDetails } from "../../shared/types/IEntityDetails";
import { Opportunity } from "./Opportunity";
import { User } from "./User";
import { createIdType } from "../createIdType";

const userOpportunity: ModelStatic<
  Model<IUserOpportunity, IEntityDetails<IUserOpportunity>>
> = db.define("user-opportunities", {
  id: createIdType(),
  applied: DataTypes.BOOLEAN,
  appliedAt: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  applicationType: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  completed: DataTypes.BOOLEAN,
  completedAt: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  contact: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  rejected: DataTypes.BOOLEAN,
  rejectedAt: {
    allowNull: true,
    type: DataTypes.DATE,
  },
});

export class UserOpportunity extends userOpportunity {
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare getOpportunity: BelongsToGetAssociationMixin<Opportunity>;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
  declare setOpportunity: BelongsToSetAssociationMixin<Opportunity, number>;
}

Opportunity.hasMany(UserOpportunity);
UserOpportunity.belongsTo(Opportunity);

User.hasMany(UserOpportunity);
UserOpportunity.belongsTo(User);
