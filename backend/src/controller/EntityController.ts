import { Router } from "express";
import { IRepository } from "../repository/types/IRepository";
import { IRouteMeta } from "../shared/types/IRouteMeta";
import { IEntity } from "./../shared/types/IEntity";
import { Controller } from "./Controller";
import { SessionInterceptor } from "./core/sessionInterceptor";

export abstract class EntityController<T extends IEntity> extends Controller {
  readonly router = Router();

  constructor(protected routeMeta: IRouteMeta, protected repo: IRepository<T>) {
    super();
    this.deleteById();
    this.insert();
    this.update();
  }

  protected deleteById() {
    this.router.delete(
      `${this.routeMeta.path}/:id`,
      SessionInterceptor((req, res) => {
        this.repo.deleteById(req.params.id);
      })
    );
  }

  protected insert() {
    this.router.post(
      this.routeMeta.path,
      SessionInterceptor(async (req, res) => {
        const entity: T = req.body;
        const newEntity = await this.repo.insert(entity);
        res.status(201).send(newEntity);
      })
    );
  }

  protected update() {
    this.router.put(
      this.routeMeta.path,
      SessionInterceptor(async (req, res) => {
        const entity: T = req.body;
        await this.repo.update(entity);
        res.status(200).send(true);
      })
    );
  }
}
