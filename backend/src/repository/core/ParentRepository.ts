import { WhereOptions } from "sequelize";
import { IEntity } from "../../shared/types/IEntity";
import { IEntityDetails } from "../../shared/types/IEntityDetails";
import { IFilterConfig } from "../types/IFilterConfig";
import { IParentRepository } from "../types/IParentRepository";
import { Repository } from "./Repository";

/**
 * The ParentRepository handles objects on root level. That means they are no children of another node.
 * Therefor e.g. for adding them it is not necessary to know its parent to add them.
 */
export abstract class ParentRepository<T extends IEntity>
  extends Repository<T>
  implements IParentRepository<T>
{
  /**
   * Adds an entity by its data
   */
  add(entity: IEntityDetails<T>): Promise<T> {
    return new Promise(async (resolve, _) => {
      const data = await this.model.create(entity as any);
      const newEntity = data.dataValues;
      resolve(newEntity);
    });
  }

  /**
   * Returns all instances of that type
   */
  findAll(filter?: IFilterConfig<T> | undefined): Promise<T[]> {
    return new Promise(async (resolve) => {
      let data;
      if (filter) {
        data = await this.model.findAll({ where: filter as WhereOptions });
      } else {
        data = await this.model.findAll();
      }
      const entities = data.map((entity) => entity.dataValues);
      resolve(entities);
    });
  }

  /**
   * Returns the first item of that type
   */
  findFirst(filter?: IFilterConfig<T> | undefined): Promise<T | undefined> {
    return new Promise(async (resolve) => {
      const data = await this.model.findOne({ where: filter as WhereOptions });
      resolve(data?.dataValues);
    });
  }
}
