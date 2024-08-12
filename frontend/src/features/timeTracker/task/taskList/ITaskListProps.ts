import { ITask } from "../../../../shared/model/ITask";

export interface ITaskListProps {
  onChange?: (tas: ITask) => void;
  onDelete?: (task: ITask) => void;
  tasks: ITask[];
}
