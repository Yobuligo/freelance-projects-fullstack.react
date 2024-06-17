import { IProject } from "../../../shared/model/IProject";

export interface IProjectActivatable {
  activeProjectId: string | undefined;
  onActivateProject: (project: IProject) => void;
}
