import { Value } from "../types/Value";
import { useLocalStorage } from "./useLocalStorage";

export const useRecentlyProjectsStorage = (): Value<string[]> => {
  const [recentlyUsedProjects, setRecentlyUsedProjects] = useLocalStorage<
    string[]
  >("freelance.recently-used-projects", []);
  return [recentlyUsedProjects, setRecentlyUsedProjects];
};
