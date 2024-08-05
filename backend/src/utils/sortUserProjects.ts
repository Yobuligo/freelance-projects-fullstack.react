import { IUserOpportunity } from "../shared/model/IUserOpportunity";

export const sortUserOpportunities = (
  userOpportunities: IUserOpportunity[]
): IUserOpportunity[] => {
  return userOpportunities.sort((left, right) => {
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
