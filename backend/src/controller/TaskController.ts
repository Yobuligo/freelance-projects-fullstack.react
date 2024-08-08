import { TaskRepo } from "../repository/TaskRepo";
import { ITask, TaskMeta } from "../shared/model/ITask";
import { EntityController } from "./EntityController";

export class TaskController extends EntityController<ITask> {
  constructor() {
    super(TaskMeta, new TaskRepo());
  }
}
