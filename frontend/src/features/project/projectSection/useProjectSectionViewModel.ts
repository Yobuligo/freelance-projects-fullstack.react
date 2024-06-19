import { useState } from "react";
import { ProjectApi } from "../../../api/ProjectApi";
import { useProjectIdStorage } from "../../../hooks/useProjectIdStorage";
import { useRequest } from "../../../hooks/useRequest";
import { useSettings } from "../../../hooks/useSettings";
import { useUserConfig } from "../../../hooks/useUserConfig";
import { IProject } from "../../../shared/model/IProject";

export const useProjectSectionViewModel = () => {
  const request = useRequest();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [userConfig, setUserConfig] = useUserConfig();
  const [displaySettings, setDisplaySettings] = useState(
    userConfig.displaySettings
  );
  const projectIdStorage = useProjectIdStorage();
  const [settings] = useSettings();
  const [activeProject, setActiveProject] = useState<IProject | undefined>(
    undefined
  );

  const openProjects = projects.filter((project) => !project.completed);
  const completedProjects = projects.filter((project) => project.completed);

  const loadProjects = async (force?: boolean) => {
    await request.send(async () => {
      const enabledProviderRequests = settings.providerRequests.filter(
        (item) => item.enabled === true
      );
      const projects = await ProjectApi.findAll(enabledProviderRequests, force);
      projects.forEach((project) => {
        const index = projectIdStorage.checkedProjectIds.findIndex(
          (projectId) => projectId === project.id
        );
        if (index !== -1) {
          project.completed = true;
        }
      });
      setProjects(projects);
    });
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

  const onActivateProject = (project: IProject) =>
    setActiveProject((previous) => {
      // same project was clicked. Deactivate all projects.
      if (previous?.id === project.id) {
        return undefined;
      }
      return project;
    });

  const needsDisplayActiveProject =
    activeProject && userConfig.openLinkInline === true;

  return {
    activeProject,
    completedProjects,
    displaySettings,
    isLoading: request.isLoading,
    loadProjects,
    needsDisplayActiveProject,
    onActivateProject,
    onCheckAll,
    onProjectChecked,
    onProjectUnchecked,
    onReload,
    onToggleDisplaySettings,
    openProjects,
  };
};
