import { useMemo, useState } from "react";
import { ProjectApi } from "../../../api/ProjectApi";
import { useProjects } from "../../../hooks/useProjects";
import { useRequest } from "../../../hooks/useRequest";
import { useSettings } from "../../../hooks/useSettings";
import { useUserConfig } from "../../../hooks/useUserConfig";
import { IProject } from "../../../shared/model/IProject";
import { isOlderThanHours } from "../../../utils/isOlderThan";
import { sortProjects } from "../../../utils/sortProjects";

export const useProjectSectionViewModel = () => {
  const request = useRequest();
  const [projects, setProjects] = useProjects();
  const [userConfig, setUserConfig] = useUserConfig();
  const [displaySettings, setDisplaySettings] = useState(
    userConfig.displaySettings
  );
  const [settings] = useSettings();
  const [selectedProject, setSelectedProject] = useState<IProject | undefined>(
    undefined
  );
  const [appliedProjectsCollapsed, setAppliedProjectsCollapsed] = useState(
    userConfig.collapseApplied ?? true
  );
  const [trashProjectsCollapsed, setTrashProjectsCollapsed] = useState(
    userConfig.collapseTrash ?? true
  );

  const openProjects = useMemo(
    () => projects.filter((project) => !project.completed),
    [projects]
  );

  const appliedProjects = useMemo(
    () =>
      projects
        .filter((project) => project.completed && project.applied)
        .sort(sortProjects),
    [projects]
  );

  const trashProjects = useMemo(
    () =>
      projects
        .filter((project) => project.completed && !project.applied)
        .sort(sortProjects),
    [projects]
  );

  /**
   * Loads projects from providers and merges it with the data from the local storage
   * If projects are already available take these projects, otherwise create new instances
   */
  const loadProjects = async (force?: boolean) => {
    await request.send(async () => {
      const enabledProviderRequests = settings.providerRequests.filter(
        (item) => item.enabled === true
      );
      const fetchedProjects = await ProjectApi.findAll(
        enabledProviderRequests,
        force
      );

      // find new projects, which are currently unknown
      const newProjects = fetchedProjects.filter((fetchedProject) => {
        const index = projects.findIndex(
          (project) => project.id === fetchedProject.id
        );
        return index === -1;
      });

      // add new projects to the project list
      if (newProjects.length > 0) {
        setProjects((previous) => {
          previous.push(...newProjects);
          return [...previous];
        });
      }
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
        }
      });
      return [...projects];
    });

  const onProjectChecked = (project: IProject) =>
    setProjects((previous) => {
      project.completed = true;
      project.completedAt = new Date().toISOString() as unknown as Date;
      return [...previous];
    });

  const onProjectUnchecked = (project: IProject) =>
    setProjects((previous) => {
      project.completed = false;
      project.completedAt = undefined;
      return [...previous];
    });

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

  const onProjectChanged = (project: IProject) => {
    setProjects((previous) => {
      const index = previous.findIndex((item) => item.id === project.id);
      if (index !== -1) {
        previous.splice(index, 1, project);
      }
      return [...previous];
    });
  };

  const onSetAppliedProjectsCollapsed = () =>
    setAppliedProjectsCollapsed((previous) => {
      previous = !previous;
      setUserConfig((userConfig) => {
        userConfig.collapseApplied = previous;
        return { ...userConfig };
      });
      return previous;
    });

  const onSetTrashProjectsCollapsed = () =>
    setTrashProjectsCollapsed((previous) => {
      previous = !previous;
      setUserConfig((userConfig) => {
        userConfig.collapseTrash = previous;
        return { ...userConfig };
      });
      return previous;
    });

  const needsDisplaySelectedProject =
    selectedProject && userConfig.openLinkInline === true;

  return {
    appliedProjects,
    appliedProjectsCollapsed,
    displaySettings,
    isLoading: request.isLoading,
    loadProjects,
    needsDisplaySelectedProject,
    onSelectProject,
    onCheckAll,
    onCheckOld,
    onProjectChanged,
    onProjectChecked,
    onProjectUnchecked,
    onReload,
    onSetAppliedProjectsCollapsed,
    onSetTrashProjectsCollapsed,
    onToggleDisplaySettings,
    openProjects,
    selectedProject,
    trashProjects,
    trashProjectsCollapsed,
  };
};
