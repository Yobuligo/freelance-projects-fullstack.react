import { ITask } from "../../../../shared/model/ITask";

export interface ITaskSectionProps {
  onAdd?: (title: string) => void;
  onDelete?: (task: ITask) => void;
  tasks: ITask[];
}
