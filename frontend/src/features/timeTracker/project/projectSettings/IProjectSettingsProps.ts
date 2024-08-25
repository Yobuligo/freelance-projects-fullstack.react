import { IProject } from "../../../../shared/model/IProject";

export interface IProjectSettingsProps {
  onChange?: (project: IProject) => void;
  onDelete?: (project: IProject) => void;
  project: IProject;
}
