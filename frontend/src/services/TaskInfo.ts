import { DateTime } from "../core/services/date/DateTime";
import { Duration } from "../core/services/date/Duration";
import { isNotNull } from "../core/utils/isNotNull";
import { isNull } from "../core/utils/isNull";
import { ITask } from "../shared/model/ITask";

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
