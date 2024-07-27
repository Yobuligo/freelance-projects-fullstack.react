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
  async deleteById(id: string): Promise<boolean> {
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
  async findById(id: string): Promise<T | undefined> {
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

  /**
   * Updates the props of an entity beside the technical fields id, createdAt and updatedAt
   */
  async update(entity: T) {
    await this.updateAll([entity]);
  }

  /**
   * Updates the props of a list of entities beside the technical fields id, createdAt and updatedAt
   */
  async updateAll(entities: T[]) {
    if (entities.length === 0) {
      return;
    }

    const entity = entities[0];
    const propNames: (keyof T)[] = [];
    for (const propName in entity) {
      if (propName !== "id") {
        propNames.push(propName);
      }
    }

    await this.model.bulkCreate(entities as any, {
      updateOnDuplicate: propNames,
    });
  }

  version(id: string): Promise<Date> {
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
