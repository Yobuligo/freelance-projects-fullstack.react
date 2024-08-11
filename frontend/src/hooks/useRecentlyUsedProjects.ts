import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const useRecentlyUsedProjects = (): [
  recentlyUsedProjects: string[],
  insertRecentlyUsedProject: (id: string) => void
] => {
  const context = useContext(AppContext);

  const insertRecentlyUsedProject = (projectId: string) => {
    context.recentlyUsedProjects[1]((previous) => {
      // delete id if already exist
      const index = previous.findIndex((item) => item === projectId);
      if (index !== -1) {
        previous.splice(index, 1);
      }

      // add the id to the first position
      previous = [projectId, ...previous];

      // only return the first 3 ids
      previous = previous.slice(0, 3);
      return previous;
    });
  };

  return [context.recentlyUsedProjects[0], insertRecentlyUsedProject];
};
