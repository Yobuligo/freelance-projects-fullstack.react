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
  db.define("projects", {
    company: DataTypes.STRING,
    location: DataTypes.STRING,
    provider: DataTypes.STRING,    
    title: DataTypes.STRING,
    url: DataTypes.STRING,
  });

export class Projects extends projects {
  declare getUserProjects: HasManyGetAssociationsMixin<UserProjects>;
}
