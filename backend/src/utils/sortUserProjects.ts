import { IUserOpportunity } from "../shared/model/IUserOpportunity";

export const sortUserProjects = (
  userProjects: IUserOpportunity[]
): IUserOpportunity[] => {
  return userProjects.sort((left, right) => {
    const leftTime = left.createdAt.getTime();
    const rightTime = right.createdAt.getTime();

    if (leftTime === rightTime) {
      return 0;
    }

    if (leftTime > rightTime) {
      return -1;
    }

    return 1;
  });
};
