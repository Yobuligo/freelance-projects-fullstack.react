import { ITask } from "../../../../shared/model/ITask";

export interface ITaskSectionProps {
  onDelete?: (task: ITask) => void;
  tasks: ITask[];
}
