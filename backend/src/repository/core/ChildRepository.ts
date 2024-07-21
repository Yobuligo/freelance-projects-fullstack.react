import { Model, WhereOptions } from "sequelize";
import { IEntity } from "../../shared/types/IEntity";
import { IEntityDetails } from "../../shared/types/IEntityDetails";
import { error } from "../../shared/utils/error";
import { IChildRepository } from "../types/IChildRepository";
import { IFilterConfig } from "../types/IFilterConfig";
import { ISequelizeModel } from "../types/ISequelizeModel";
import { Repository } from "./Repository";

/**
 * The ChildRepository handles objects which have a relation to another object with a 1 to n relation.
 * E.g. a Board has several Notes. But Notes belongs to a Board. A Note must have a relation to a Board.
 */
export abstract class ChildRepository<
    TEntity extends IEntity,
    TParent extends IEntity
  >
  extends Repository<TEntity>
  implements IChildRepository<TEntity, TParent>
{
  private parentRelationName = `${this.model.name.toLowerCase()}s`;

  /**
   * Next to the model of the entity, it is also required to provide the model of the parent.
   * E.g. {@link model} = Note and {@link parentModel} = Board
   */
  constructor(
    model: ISequelizeModel<TEntity>,
    private parentModel: ISequelizeModel<TParent>
  ) {
    super(model);
  }

  /**
   * To add a new entity the parentId is required which must be set to the foreignKey field.
   * When setting up the relation via e.g. Board.hasMany(Note) and Note.belongsTo(Board),
   * automatically a foreignKey check will be executed when the parentId doesn't belong to a valid parent (a parent which doesn't exist)
   */
  add(parentId: number, entity: IEntityDetails<TEntity>): Promise<TEntity> {
    return new Promise(async (resolve) => {
      const foreignKey = this.fillForeignKey(parentId);
      const data = await this.model.create({ ...entity, ...foreignKey } as any);
      resolve(data.dataValues);
    });
  }

  /**
   * Returns all elements of the current type which are related to the parent with {@link parentId}.
   * E.g. Board with id 1 has the Notes with ids 5, 6, 7, 8.
   * To only have one db select we use eager loading by selecting the parent from the parentModel by its id (e.g. a Board)
   * and in addition the model itself (e.g. Notes) via using include
   * Finally we have to map the returned values from the sequelize representation to the external representation.
   */
  findAll(
    parentId: number,
    filter?: IFilterConfig<TEntity> | undefined
  ): Promise<TEntity[]> {
    return new Promise(async (resolve) => {
      const data = await this.parentModel.findOne({
        where: { id: parentId } as WhereOptions,
        include: { model: this.model, where: filter },
      });

      const entities = this.mapDataToEntities(data);
      resolve(entities);
    });
  }

  /**
   * Returns the first element of a type that belongs to a specific parent with id parentId (e.g. first Note that belongs to the Board with id 5)
   */
  findFirst(
    parentId: number,
    filter?: IFilterConfig<TEntity> | undefined
  ): Promise<TEntity | undefined> {
    return new Promise(async (resolve) => {
      const data = await this.parentModel.findOne({
        where: { id: parentId } as WhereOptions,
        include: { model: this.model, limit: 1, where: filter },
      });
      const entities = this.mapDataToEntities(data);
      resolve(entities[0]);
    });
  }

  /**
   * Returns the foreign key field name.
   * E.g. for relation Board -> Note would the foreign key field name in the Note table be boardId
   */
  private getParentForeignKeyFieldName() {
    for (const relationName in this.model.associations) {
      const relation = this.model.associations[relationName];
      if (relation.target === this.parentModel) {
        return relation.foreignKey;
      }
    }
  }

  private fillForeignKey(parentId: number) {
    const foreignKeyFieldName = this.getParentForeignKeyFieldName() ?? error();
    const foreignKey: any = {};
    foreignKey[foreignKeyFieldName] = parentId;
    return foreignKey;
  }

  private mapDataToEntities(
    data: Model<TParent, IEntityDetails<TParent>> | null
  ): TEntity[] {
    // parent not found
    if (!data) {
      return [];
    }

    // get related objects
    const relatedData = data?.get(this.parentRelationName) as Model<TEntity>[];
    if (!relatedData) {
      throw new Error(
        `Error while fetching data from '${this.model.name}' by parent id. Relation '${this.parentRelationName}' doesn't exist on parent '${this.parentModel.name}'`
      );
    }

    return relatedData.map((value) => value.dataValues);
  }
}
