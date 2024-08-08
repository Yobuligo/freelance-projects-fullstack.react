import { DateTime } from "../../../../core/services/date/DateTime";
import { ITaskListProps } from "./ITaskListProps";

export const useTaskListViewModel = (props: ITaskListProps) => {
  const tasks = props.tasks.sort((left, right) => {
    if (!left.stoppedAt) {
      return -1;
    }

    if (!right.stoppedAt) {
      return 1;
    }
    return DateTime.compare(right.stoppedAt, left.stoppedAt);
  });

  return { tasks };
};
