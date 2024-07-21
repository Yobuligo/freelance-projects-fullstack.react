import { DataTypes, Model, ModelStatic } from "sequelize";
import { IProject } from "../shared/model/IProject";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { db } from "../db/db";

export const Projects: ModelStatic<Model<IProject, IEntityDetails<IProject>>> =
  db.define("projects", {
    providerType: DataTypes.INTEGER,
    company: DataTypes.STRING,
    location: DataTypes.STRING,
    title: DataTypes.STRING,
    url: DataTypes.STRING,
  });
