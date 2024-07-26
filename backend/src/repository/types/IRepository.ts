import { IEntity } from "../../shared/types/IEntity";

/**
 * An implementation of this interface represents the repository.
 * It represents each type of repository and contains general methods.
 */
export interface IRepository<T extends IEntity> {
  deleteById(id: string): Promise<boolean>;
  findById(id: string): Promise<T | undefined>;
  version(id: string): Promise<Date>;
}
