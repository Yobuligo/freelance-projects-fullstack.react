import { IUserProject } from "../../../shared/model/IUserProject";

export const setUserProjectInCompleted = (userProject: IUserProject) => {
  userProject.completed = false;
  userProject.completedAt = undefined;
};
