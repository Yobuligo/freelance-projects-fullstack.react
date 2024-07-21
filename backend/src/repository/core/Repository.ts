import { WhereOptions } from "sequelize";
import { IEntity } from "../../shared/types/IEntity";
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
   * Finds an entity by its id
   */
  findById(id: number): Promise<T | undefined> {
    return new Promise(async (resolve) => {
      const data = await this.model.findByPk(id);
      resolve(data?.dataValues);
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
