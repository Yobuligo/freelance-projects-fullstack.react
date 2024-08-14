import { ITask, TaskRouteMeta } from "../shared/model/ITask";
import { EntityRepository } from "./core/EntityRepository";

export class TaskApi extends EntityRepository<ITask> {
  constructor() {
    super(TaskRouteMeta);
  }
}
