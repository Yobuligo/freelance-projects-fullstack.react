import { DataTypes, Model, ModelStatic } from "sequelize";
import { db } from "../../db/db";
import { IProject } from "../../shared/model/IProject";
import { IEntityDetails } from "../../shared/types/IEntityDetails";
import { createIdType } from "../createIdType";
import { User } from "./User";

const project: ModelStatic<Model<IProject, IEntityDetails<IProject>>> =
  db.define("projects", {
    id: createIdType(),
    title: DataTypes.STRING,
  });

export class Project extends project {}

User.hasMany(Project);
Project.belongsTo(User);
