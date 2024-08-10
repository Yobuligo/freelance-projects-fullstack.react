import { ITask, TaskRouteMeta } from "../shared/model/ITask";
import { Repository } from "./core/Repository";

export class TaskApi extends Repository<ITask> {
  constructor() {
    super(TaskRouteMeta);
  }
}
