import {
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  ModelStatic,
} from "sequelize";
import { db } from "../db/db";
import { IOpportunity } from "../shared/model/IOpportunity";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { UserProject } from "./UserProject";
import { createIdType } from "./createIdType";

const opportunity: ModelStatic<Model<IOpportunity, IEntityDetails<IOpportunity>>> =
  db.define(
    "opportunities",
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

export class Opportunity extends opportunity {
  declare getUserProjects: HasManyGetAssociationsMixin<UserProject>;
}
