import { IEntity } from "../../shared/types/IEntity";
import { IEntityDetails } from "../../shared/types/IEntityDetails";

/**
 * An implementation of this interface represents the repository.
 * It represents each type of repository and contains general methods.
 */
export interface IRepository<T extends IEntity> {
  deleteById(id: string): Promise<boolean>;
  findById(id: string): Promise<T | undefined>;
  insert(entity: IEntityDetails<T>): Promise<T>;
  update(entity: T): Promise<void>;
  updateAll(entities: T[]): Promise<void>;
  version(id: string): Promise<Date>;
}
