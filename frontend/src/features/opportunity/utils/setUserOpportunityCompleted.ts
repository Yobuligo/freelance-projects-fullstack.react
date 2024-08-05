import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";

export const setUserOpportunityCompleted = (
  userOpportunity: IUserOpportunity
) => {
  userOpportunity.completed = true;
  userOpportunity.completedAt = new Date().toISOString() as unknown as Date;
};
