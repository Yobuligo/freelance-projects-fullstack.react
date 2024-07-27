import { IUserProject } from "../shared/model/IUserProject";

export const sortUserProjects = (left: IUserProject, right: IUserProject) => {
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
