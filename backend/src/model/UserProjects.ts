import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
  ModelStatic,
} from "sequelize";
import { db } from "../db/db";
import { IUserProject } from "../shared/model/IUserProject";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { Projects } from "./Projects";
import { Users } from "./Users";
import { createIdType } from "./createIdType";

const userProjects: ModelStatic<
  Model<IUserProject, IEntityDetails<IUserProject>>
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

export class UserProjects extends userProjects {
  declare getUser: BelongsToGetAssociationMixin<Users>;
  declare getProject: BelongsToGetAssociationMixin<Projects>;
  declare setUser: BelongsToSetAssociationMixin<Users, number>;
  declare setProject: BelongsToSetAssociationMixin<Projects, number>;
}

Projects.hasMany(UserProjects);
UserProjects.belongsTo(Projects);

Users.hasMany(UserProjects);
UserProjects.belongsTo(Users);
