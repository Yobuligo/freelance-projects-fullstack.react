import { IProject } from "../../../../shared/model/IProject";
import { ITask } from "../../../../shared/model/ITask";

export interface IProjectDetailsProps {
  onBack?: () => void;
  onChangeProject?: (project: IProject) => void;
  onChangeTask?: (project: IProject, task: ITask) => void;
  onDeleteTask?: (project: IProject, task: ITask) => void;
  onDeleteProject?: (project: IProject) => void;
  project: IProject;
}
