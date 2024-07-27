import {
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  ModelStatic,
} from "sequelize";
import { db } from "../db/db";
import { IProject } from "../shared/model/IProject";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { UserProject } from "./UserProject";
import { createIdType } from "./createIdType";

const project: ModelStatic<Model<IProject, IEntityDetails<IProject>>> =
  db.define(
    "projects",
    {
      id: createIdType(),
      company: DataTypes.STRING,
      location: DataTypes.STRING,
      provider: DataTypes.STRING,
      publishedAt: DataTypes.DATE,
      title: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    { indexes: [{ unique: true, fields: ["url"] }] }
  );

export class Project extends project {
  declare getUserProjects: HasManyGetAssociationsMixin<UserProject>;
}
