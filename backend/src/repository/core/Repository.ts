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
   * Deletes an entity by its id
   */
  deleteById(id: number): Promise<boolean> {
    return new Promise(async (resolve) => {
      const count = await this.model.destroy({
        where: {
          id: id,
        } as WhereOptions,
      });
      resolve(count === 1);
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
      const entities = data.map((entity) => entity.toJSON());
      resolve(entities);
    });
  }

  /**
   * Finds an entity by its id
   */
  findById(id: number): Promise<T | undefined> {
    return new Promise(async (resolve) => {
      const data = await this.model.findByPk(id);
      resolve(data?.toJSON());
    });
  }

  /**
   * Returns the first item of that type
   */
  findFirst(filter?: IFilterConfig<T> | undefined): Promise<T | undefined> {
    return new Promise(async (resolve) => {
      const data = await this.model.findOne({ where: filter as WhereOptions });
      resolve(data?.toJSON());
    });
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
