import { IProject } from "../../../../shared/model/IProject";
import { ITask } from "../../../../shared/model/ITask";

export interface IProjectDetailsProps {
  onBack?: () => void;
  onChangeTask?: (project: IProject, task: ITask) => void;
  onDeleteTask?: (project: IProject, task: ITask) => void;
  project: IProject;
}
