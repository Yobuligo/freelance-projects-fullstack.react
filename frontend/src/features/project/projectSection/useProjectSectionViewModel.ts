import { useState } from "react";
import { ProjectApi } from "../../../api/ProjectApi";
import { useErrorMessage } from "../../../hooks/useErrorMessage";
import { useProjectIdStorage } from "../../../hooks/useProjectIdStorage";
import { useSettings } from "../../../hooks/useSettings";
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
  const [settings] = useSettings();
  const [, setErrorMessage] = useErrorMessage();

  const openProjects = projects.filter((project) => !project.completed);
  const completedProjects = projects.filter((project) => project.completed);

  const loadProjects = async (force?: boolean) => {
    try {
      setIsLoading(true);
      const projects = await ProjectApi.findAll(
        settings.providerRequests,
        force
      );
      projects.forEach((project) => {
        const index = projectIdStorage.checkedProjectIds.findIndex(
          (projectId) => projectId === project.id
        );
        if (index !== -1) {
          project.completed = true;
        }
      });

      setProjects(projects);
    } catch (error) {
      setErrorMessage(error as string);
    }
    setIsLoading(false);
  };

  const onCheckAll = () =>
    setProjects((projects) => {
      projects.forEach((project) => {
        project.completed = true;
        projectIdStorage.setChecked(project);
      });
      return [...projects];
    });

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

  const onReload = () => loadProjects(true);

  const onToggleDisplaySettings = () =>
    setDisplaySettings((previous) => {
      previous = !previous;
      setUserConfig((userConfig) => {
        return { ...userConfig, displaySettings: previous };
      });
      return previous;
    });

  return {
    completedProjects,
    displaySettings,
    isLoading,
    loadProjects,
    onCheckAll,
    onProjectChecked,
    onProjectUnchecked,
    onReload,
    onToggleDisplaySettings,
    openProjects,
  };
};
