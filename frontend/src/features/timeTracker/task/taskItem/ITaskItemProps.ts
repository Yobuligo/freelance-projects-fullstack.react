import { ITask } from "../../../../shared/model/ITask";

export interface ITaskItemProps {
  onDelete?: (task: ITask) => void;
  onChange?: (tas: ITask) => void;
  task: ITask;
}
