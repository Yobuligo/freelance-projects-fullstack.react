import { IEntity } from "../../shared/types/IEntity";
import { IEntityDetails } from "../../shared/types/IEntityDetails";
import { IFilterConfig } from "./IFilterConfig";

/**
 * An implementation of this interface represents a child repository.
 * A child repository refers to an entity {@link TEntity} that relates to another entity {@link TParent}.
 * So both have a 1 to n relation.
 */
export interface IChildRepository<
  TEntity extends IEntity,
  TParent extends IEntity
> {
  add(parentId: number, entity: IEntityDetails<TEntity>): Promise<TEntity>;
  findAll(
    parentId: number,
    filter?: IFilterConfig<TEntity>
  ): Promise<TEntity[]>;
  findFirst(
    parentId: number,
    filter?: IFilterConfig<TEntity>
  ): Promise<TEntity | undefined>;
}
