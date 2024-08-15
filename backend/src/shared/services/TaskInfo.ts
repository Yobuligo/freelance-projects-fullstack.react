import { DateTime } from "../../core/date/DateTime";
import { Duration } from "../../core/date/Duration";
import { isNotNull } from "../../core/utils/isNotNull";
import { ITask } from "../model/ITask";
import { isNull } from "../utils/isNull";

export class TaskInfo {
  /**
   * Returns the duration of a task
   */
  static toDuration(task: ITask): Duration {
    if (!task.stoppedAt) {
      return DateTime.subtract(new Date(), task.startedAt);
    }
    return DateTime.subtract(task.stoppedAt, task.startedAt);
  }

  /**
   * Returns if the given {@link task} is running
   */
  static isRunning(task: ITask): boolean {
    return isNotNull(task.startedAt) && isNull(task.stoppedAt);
  }
}
