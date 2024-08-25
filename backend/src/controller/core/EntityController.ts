import { IRepository } from "../../repository/types/IRepository";
import { IRouteMeta } from "../../shared/types/IRouteMeta";
import { IEntity } from "../../shared/types/IEntity";
import { Controller } from "./Controller";
import { SessionInterceptor } from "./SessionInterceptor";

export abstract class EntityController<
  TEntity extends IEntity,
  TRepository extends IRepository<TEntity>
> extends Controller {
  constructor(protected routeMeta: IRouteMeta, protected repo: TRepository) {
    super();
    this.deleteById();
    this.insert();
    this.update();
  }

  protected deleteById() {
    this.router.delete(
      `${this.routeMeta.path}/:id`,
      SessionInterceptor(async (req) => {
        await this.repo.deleteById(req.params.id);
      })
    );
  }

  protected insert() {
    this.router.post(
      this.routeMeta.path,
      SessionInterceptor(async (req, res) => {
        const entity: TEntity = req.body;
        const newEntity = await this.repo.insert(entity);
        res.status(201).send(newEntity);
      })
    );
  }

  protected update() {
    this.router.put(
      `${this.routeMeta.path}/:id`,
      SessionInterceptor(async (req, res) => {
        const entity: TEntity = req.body;
        await this.repo.update(entity);
        res.status(200).send(true);
      })
    );
  }
}
