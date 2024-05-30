import { IProject } from "../shared/model/IProject";
import { useLocalStorage } from "./useLocalStorage";

export const useProjectIdStorage = () => {
  const [checkedProjectIds, setCheckedProjectIds] = useLocalStorage<string[]>(
    "freelance.completed-projects",
    []
  );

  const setChecked = (project: IProject) =>
    setCheckedProjectIds((previous) => {
      previous.push(project.id);
      return [...previous];
    });

  const setUnchecked = (project: IProject) =>
    setCheckedProjectIds((previous) => {
      const index = previous.findIndex((item) => item === project.id);
      previous.splice(index, 1);
      return [...previous];
    });

  return { checkedProjectIds, setChecked, setUnchecked };
};
