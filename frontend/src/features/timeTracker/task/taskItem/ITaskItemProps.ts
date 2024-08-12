import { ITask } from "../../../../shared/model/ITask";

export interface ITaskItemProps {
  onChange?: (tas: ITask) => void;
  onDelete?: (task: ITask) => void;
  task: ITask;
}
