import { useState } from "react";
import { ProjectApi } from "../../../api/ProjectApi";
import { useProjectIdStorage } from "../../../hooks/useProjectIdStorage";
import { useProjects } from "../../../hooks/useProjects";
import { useRequest } from "../../../hooks/useRequest";
import { useSettings } from "../../../hooks/useSettings";
import { useUserConfig } from "../../../hooks/useUserConfig";
import { IProject } from "../../../shared/model/IProject";
import { isOlderThanHours } from "../../../utils/isOlderThan";

export const useProjectSectionViewModel = () => {
  const request = useRequest();
  const [projects, setProjects] = useProjects();
  const [userConfig, setUserConfig] = useUserConfig();
  const [displaySettings, setDisplaySettings] = useState(
    userConfig.displaySettings
  );
  const projectIdStorage = useProjectIdStorage();
  const [settings] = useSettings();
  const [selectedProject, setSelectedProject] = useState<IProject | undefined>(
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

  /**
   * Marks all projects as completed
   */
  const onCheckAll = () =>
    setProjects((projects) => {
      projects.forEach((project) => {
        if (!project.completed) {
          project.completed = true;
          projectIdStorage.setChecked(project);
        }
      });
      return [...projects];
    });

  /**
   * Marks all projects as completed, which are older than 24 hours
   */
  const onCheckOld = () =>
    setProjects((projects) => {
      projects.forEach((project) => {
        if (!project.completed && isOlderThanHours(project.createdAt, 24)) {
          project.completed = true;
          projectIdStorage.setChecked(project);
        }
      });
      return [...projects];
    });

  const onProjectChecked = (project: IProject) => {
    setProjects((previous) => {
      project.completed = true;
      project.completedAt = new Date();
      return [...previous];
    });
    projectIdStorage.setChecked(project);
  };

  const onProjectUnchecked = (project: IProject) => {
    setProjects((previous) => {
      project.completed = false;
      project.completedAt = undefined;
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

  const onSelectProject = (project: IProject) => {
    setSelectedProject((previous) => {
      // if selected project shouldn't be displayed, set it to undefined
      if (userConfig.openLinkInline === false) {
        return undefined;
      }

      // same project was clicked. Unselect all projects
      if (previous?.id === project.id) {
        return undefined;
      }
      return project;
    });
  };

  const needsDisplaySelectedProject =
    selectedProject && userConfig.openLinkInline === true;

  return {
    selectedProject,
    completedProjects,
    displaySettings,
    isLoading: request.isLoading,
    loadProjects,
    needsDisplaySelectedProject,
    onSelectProject,
    onCheckAll,
    onCheckOld,
    onProjectChecked,
    onProjectUnchecked,
    onReload,
    onToggleDisplaySettings,
    openProjects,
  };
};
