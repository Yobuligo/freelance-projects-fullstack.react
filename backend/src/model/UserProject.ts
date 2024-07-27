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
import { Project } from "./Projects";
import { User } from "./User";
import { createIdType } from "./createIdType";

const userProject: ModelStatic<
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

export class UserProject extends userProject {
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare getProject: BelongsToGetAssociationMixin<Project>;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
  declare setProject: BelongsToSetAssociationMixin<Project, number>;
}

Project.hasMany(UserProject);
UserProject.belongsTo(Project);

User.hasMany(UserProject);
UserProject.belongsTo(User);
