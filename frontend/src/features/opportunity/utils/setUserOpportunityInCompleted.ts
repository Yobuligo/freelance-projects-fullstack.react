import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";

export const setUserOpportunityInCompleted = (
  userOpportunity: IUserOpportunity
) => {
  userOpportunity.completed = false;
  userOpportunity.completedAt = undefined;
};
