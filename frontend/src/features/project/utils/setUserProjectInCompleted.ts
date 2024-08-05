import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";

export const setUserProjectInCompleted = (userProject: IUserOpportunity) => {
  userProject.completed = false;
  userProject.completedAt = undefined;
};
