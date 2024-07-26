import {
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  ModelStatic,
} from "sequelize";
import { db } from "../db/db";
import { IProject } from "../shared/model/IProject";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { UserProjects } from "./UserProjects";

const projects: ModelStatic<Model<IProject, IEntityDetails<IProject>>> =
  db.define(
    "projects",
    {
      company: DataTypes.STRING,
      location: DataTypes.STRING,
      provider: DataTypes.STRING,
      publishedAt: DataTypes.DATE,
      title: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    { indexes: [{ unique: true, fields: ["url"] }] }
  );

export class Projects extends projects {
  declare getUserProjects: HasManyGetAssociationsMixin<UserProjects>;
}
