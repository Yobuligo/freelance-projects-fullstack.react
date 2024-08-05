import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
  ModelStatic,
} from "sequelize";
import { db } from "../db/db";
import { IUserOpportunity } from "../shared/model/IUserOpportunity";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { Opportunity } from "./Opportunity";
import { User } from "./User";
import { createIdType } from "./createIdType";

const userProject: ModelStatic<
  Model<IUserOpportunity, IEntityDetails<IUserOpportunity>>
> = db.define("user-projects", {
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

export class UserProject extends userProject {
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare getProject: BelongsToGetAssociationMixin<Opportunity>;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
  declare setProject: BelongsToSetAssociationMixin<Opportunity, number>;
}

Opportunity.hasMany(UserProject);
UserProject.belongsTo(Opportunity);

User.hasMany(UserProject);
UserProject.belongsTo(User);
