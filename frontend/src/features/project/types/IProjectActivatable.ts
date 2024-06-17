import { IProject } from "../../../shared/model/IProject";

export interface IProjectActivatable {
  activeProject: IProject | undefined;
  onActivateProject: (project: IProject) => void;
}
