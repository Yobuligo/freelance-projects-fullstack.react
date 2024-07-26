import { WhereOptions } from "sequelize";
import { IEntity } from "../../shared/types/IEntity";
import { IEntityDetails } from "../../shared/types/IEntityDetails";
import { IFilterConfig } from "../types/IFilterConfig";
import { IRepository } from "../types/IRepository";
import { ISequelizeModel } from "../types/ISequelizeModel";

/**
 * The repository shows how to access the data of a model in a generic way
 */
export abstract class Repository<T extends IEntity> implements IRepository<T> {
  constructor(protected model: ISequelizeModel<T>) {}

  /**
   * Deletes an entity by its id
   */
  async deleteById(id: number): Promise<boolean> {
    const count = await this.model.destroy({
      where: {
        id: id,
      } as WhereOptions,
    });
    return count === 1;
  }

  /**
   * Returns all instances of that type
   */
  async findAll(filter?: IFilterConfig<T> | undefined): Promise<T[]> {
    let data;
    if (filter) {
      data = await this.model.findAll({ where: filter as WhereOptions });
    } else {
      data = await this.model.findAll();
    }
    const entities = data.map((entity) => entity.toJSON());
    return entities;
  }

  /**
   * Finds an entity by its id
   */
  async findById(id: number): Promise<T | undefined> {
    const data = await this.model.findByPk(id);
    return data?.toJSON();
  }

  /**
   * Returns the first item of that type
   */
  async findFirst(
    filter?: IFilterConfig<T> | undefined
  ): Promise<T | undefined> {
    const data = await this.model.findOne({ where: filter as WhereOptions });
    return data?.toJSON();
  }

  /**
   * Inserts an entity by its data
   */
  async insert(entity: IEntityDetails<T>): Promise<T> {
    const data = await this.model.create(entity as any);
    return data.toJSON();
  }

  version(id: number): Promise<Date> {
    return new Promise(async (resolve, reject) => {
      const entity = await this.findById(id);
      if (!entity) {
        return reject(
          `Error while reading version of data object with id '${id}'. Data object is unknown.`
        );
      }
      resolve(entity.updatedAt);
    });
  }
}
