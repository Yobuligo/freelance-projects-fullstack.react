import { useState } from "react";
import { IProject } from "../shared/model/IProject";
import { readLocalStorage } from "../utils/readLocalStorage";
import { writeLocalStorage } from "../utils/writeLocalStorage";

export const LOCAL_STORAGE_CHECKED_PROJECTS = "freelance.checked-projects";

export const useProjectStorage = () => {
  const [checkedProjects, setCheckedProjects] = useState<IProject[]>(
    readLocalStorage(LOCAL_STORAGE_CHECKED_PROJECTS) ?? []
  );

  const setChecked = (project: IProject) => {
    setCheckedProjects((previous) => {
      previous.push(project);
      writeLocalStorage(LOCAL_STORAGE_CHECKED_PROJECTS, previous);
      return [...previous];
    });
  };

  const setUnchecked = (project: IProject) => {
    setCheckedProjects((previous) => {
      const index = previous.findIndex((item) => item.id === project.id);
      previous.splice(index, 1);
      writeLocalStorage(LOCAL_STORAGE_CHECKED_PROJECTS, previous);
      return [...previous];
    });
  };

  return { checkedProjects, setChecked, setUnchecked };
};
