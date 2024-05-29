import { IProject } from "../shared/model/IProject";

export const sortProjects = (projects: IProject[]): IProject[] => {
  return projects.sort((left, right) => {
    const leftTime = left.createdAt.getTime();
    const rightTime = right.createdAt.getTime();

    if (leftTime === rightTime) {
      return 0;
    }

    if (leftTime < rightTime) {
      return -1;
    }

    return 1;
  });
};
