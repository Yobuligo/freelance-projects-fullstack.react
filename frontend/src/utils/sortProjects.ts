import { IProject } from "../shared/model/IProject";

export const sortProjects = (left: IProject, right: IProject) => {
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
