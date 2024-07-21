import { Model, ModelStatic } from "sequelize";
import { IEntity } from "../../shared/types/IEntity";
import { IEntityDetails } from "../../shared/types/IEntityDetails";

export type ISequelizeModel<T extends IEntity> = ModelStatic<
  Model<T, IEntityDetails<T>>
>;
