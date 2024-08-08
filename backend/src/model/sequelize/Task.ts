import { DataTypes, Model, ModelStatic } from "sequelize";
import { ITask } from "../../shared/model/ITask";
import { IEntityDetails } from "../../shared/types/IEntityDetails";
import { db } from "../../db/db";
import { createIdType } from "../createIdType";
import { Project } from "./Project";

const task: ModelStatic<Model<ITask, IEntityDetails<ITask>>> = db.define(
  "tasks",
  {
    id: createIdType(),
    startedAt: DataTypes.DATE,
    stoppedAt: DataTypes.DATE,
    title: DataTypes.STRING,
  }
);

export class Task extends task {}

Project.hasMany(Task);
Task.belongsTo(Project);
