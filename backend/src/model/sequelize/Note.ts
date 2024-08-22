import { DataTypes, Model, ModelStatic } from "sequelize";
import { db } from "../../db/db";
import { IEntityDetails } from "../../shared/types/IEntityDetails";
import { INote } from "../../shared/model/INote";
import { createIdType } from "../createIdType";

const note: ModelStatic<Model<INote, IEntityDetails<INote>>> = db.define(
  "note",
  {
    id: createIdType(),
    text: { type: DataTypes.TEXT("long") },
  }
);

export class Note extends note {}
