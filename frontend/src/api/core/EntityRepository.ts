import { IEntity } from "../../shared/types/IEntity";
import { Repository } from "./Repository";

export class EntityRepository<
  TEntity extends IEntity
> extends Repository<TEntity> {
  async update(data: TEntity): Promise<void> {
    await this.put(`${this.url}/${data.id}`, data);
  }
}
