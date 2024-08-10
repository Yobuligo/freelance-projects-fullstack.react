import { TaskRepo } from "../repository/TaskRepo";
import { ITask, TaskRouteMeta } from "../shared/model/ITask";
import { EntityController } from "./EntityController";

export class TaskController extends EntityController<ITask> {
  constructor() {
    super(TaskRouteMeta, new TaskRepo());
  }
}
