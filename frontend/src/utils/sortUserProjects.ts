import { IUserOpportunity } from "../shared/model/IUserOpportunity";

export const sortUserProjects = (left: IUserOpportunity, right: IUserOpportunity) => {
  if (!left.completedAt) {
    return 1;
  }

  if (!right.completedAt) {
    return -1;
  }

  if (left.completedAt < right.completedAt) {
    return 1;
  }

  if (left.completedAt > right.completedAt) {
    return -1;
  }

  return 0;
};
