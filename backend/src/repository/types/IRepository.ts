import { IEntity } from "../../shared/types/IEntity";

/**
 * An implementation of this interface represents the repository.
 * It represents each type of repository and contains general methods.
 */
export interface IRepository<T extends IEntity> {
  deleteById(id: number): Promise<boolean>;
  findById(id: number): Promise<T | undefined>;
  version(id: number): Promise<Date>;
}
