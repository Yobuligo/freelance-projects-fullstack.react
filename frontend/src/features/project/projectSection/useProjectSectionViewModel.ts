import { useState } from "react";
import { ProjectApi } from "../../../api/ProjectApi";
import { useProjectIdStorage } from "../../../hooks/useProjectIdStorage";
import { useUserConfig } from "../../../hooks/useUserConfig";
import { IProject } from "../../../shared/model/IProject";

export const useProjectSectionViewModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [userConfig, setUserConfig] = useUserConfig();
  const [displaySettings, setDisplaySettings] = useState(
    userConfig.displaySettings
  );
  const projectIdStorage = useProjectIdStorage();

  const openProjects = projects.filter((project) => !project.completed);
  const completedProjects = projects.filter((project) => project.completed);

  const loadProjects = async () => {
    setIsLoading(true);
    const projects = await ProjectApi.findAll();
    projects.forEach((project) => {
      const index = projectIdStorage.checkedProjectIds.findIndex(
        (projectId) => projectId === project.id
      );
      if (index !== -1) {
        project.completed = true;
      }
    });

    setProjects(projects);
    setIsLoading(false);
  };

  const onProjectChecked = (project: IProject) => {
    setProjects((previous) => {
      project.completed = true;
      return [...previous];
    });
    projectIdStorage.setChecked(project);
  };

  const onProjectUnchecked = (project: IProject) => {
    setProjects((previous) => {
      project.completed = false;
      return [...previous];
    });
    projectIdStorage.setUnchecked(project);
  };

  const onReload = () => loadProjects();

  const onToggleDisplaySettings = () =>
    setDisplaySettings((previous) => {
      previous = !previous;
      setUserConfig((userConfig) => {
        userConfig.displaySettings = previous;
        return { ...userConfig };
      });
      return previous;
    });

  return {
    completedProjects,
    displaySettings,
    isLoading,
    loadProjects,
    onProjectChecked,
    onProjectUnchecked,
    onReload,
    onToggleDisplaySettings,
    openProjects,
  };
};
