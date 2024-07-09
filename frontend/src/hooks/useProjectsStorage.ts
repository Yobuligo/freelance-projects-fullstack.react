import { IProject } from "../shared/model/IProject";
import { Value } from "../types/Value";
import { useLocalStorage } from "./useLocalStorage";

export const useProjectsStorage = (): Value<IProject[]> => {
  const [projects, setProjects] = useLocalStorage<IProject[]>(
    "freelance.projects",
    []
  );
  return [projects, setProjects];
};
