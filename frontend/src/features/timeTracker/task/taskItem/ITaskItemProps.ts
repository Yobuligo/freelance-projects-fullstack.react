import { ITask } from "../../../../shared/model/ITask";

export interface ITaskItemProps {
  onDelete?: (task: ITask) => void;
  task: ITask;
}
