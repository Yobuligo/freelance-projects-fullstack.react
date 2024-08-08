import { ITask } from "../../../../shared/model/ITask";

export interface ITaskListProps {
  onDelete?: (task: ITask) => void;
  tasks: ITask[];
}
