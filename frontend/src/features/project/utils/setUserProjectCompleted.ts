import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";

export const setUserProjectCompleted = (userProject: IUserOpportunity) => {
  userProject.completed = true;
  userProject.completedAt = new Date().toISOString() as unknown as Date;
};
