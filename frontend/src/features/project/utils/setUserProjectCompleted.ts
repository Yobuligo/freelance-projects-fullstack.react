import { IUserProject } from "../../../shared/model/IUserProject";

export const setUserProjectCompleted = (userProject: IUserProject) => {
  userProject.completed = true;
  userProject.completedAt = new Date().toISOString() as unknown as Date;
};
