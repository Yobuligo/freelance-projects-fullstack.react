import { Task } from "../model/sequelize/Task";
import { ITask } from "../shared/model/ITask";
import { Repository } from "./core/Repository";

export class TaskRepo extends Repository<ITask> {
  constructor() {
    super(Task);
  }
}
