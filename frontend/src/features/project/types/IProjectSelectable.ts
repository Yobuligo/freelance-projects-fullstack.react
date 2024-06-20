import { IProject } from "../../../shared/model/IProject";

export interface IProjectSelectable {
  selectedProject: IProject | undefined;
  onSelectProject: (project: IProject) => void;
}
