import { useMemo, useState } from "react";
import { UserProjectApi } from "../../../api/UserProjectApi";
import { useRequest } from "../../../hooks/useRequest";
import { useSettings } from "../../../hooks/useSettings";
import { useUserConfig } from "../../../hooks/useUserConfig";
import { useUserProjects } from "../../../hooks/useUserProjects";
import { IUserProject } from "../../../shared/model/IUserProject";
import { isOlderThanHours } from "../../../utils/isOlderThan";
import { sortUserProjects } from "../../../utils/sortUserProjects";

export const useProjectSectionViewModel = () => {
  const request = useRequest();
  const [userProjects, setUserProjects] = useUserProjects();
  const [userConfig, setUserConfig] = useUserConfig();
  const [displaySettings, setDisplaySettings] = useState(
    userConfig.displaySettings
  );
  const [settings] = useSettings();
  const [selectedUserProject, setSelectedUserProject] = useState<
    IUserProject | undefined
  >(undefined);
  const [appliedUserProjectsCollapsed, setAppliedUserProjectsCollapsed] =
    useState(userConfig.collapseApplied ?? true);
  const [trashUserProjectsCollapsed, setTrashUserProjectsCollapsed] = useState(
    userConfig.collapseTrash ?? true
  );

  /**
   * Returns a list of projects, which are not open, so not marked as completed or applied to
   */
  const openUserProjects = useMemo(
    () => userProjects.filter((userProject) => !userProject.completed),
    [userProjects]
  );

  /**
   * Returns a list of projects, the user has applied to
   */
  const appliedUserProjects = useMemo(
    () =>
      userProjects
        .filter((userProject) => userProject.completed && userProject.applied)
        .sort(sortUserProjects),
    [userProjects]
  );

  /**
   * Returns a list of projects, the user has marked as completed, those who are not interesting
   */
  const trashUserProjects = useMemo(
    () =>
      userProjects
        .filter((userProject) => userProject.completed && !userProject.applied)
        .sort(sortUserProjects),
    [userProjects]
  );

  /**
   * Loads user projects from providers and merges it with the data from the local storage
   * If projects are already available take these projects, otherwise create new instances
   */
  const loadUserProjects = async (force?: boolean) => {
    await request.send(async () => {
      const enabledProviderRequests = settings.providerRequests.filter(
        (item) => item.enabled === true
      );
      const projectApi = new UserProjectApi();
      const fetchedUserProjects = await projectApi.findAll(
        enabledProviderRequests,
        force
      );

      setUserProjects(fetchedUserProjects);
    });
  };

  /**
   * Marks all user projects as completed
   */
  const onCheckAll = () =>
    setUserProjects((userProjects) => {
      userProjects.forEach((userProject) => {
        if (!userProject.completed) {
          userProject.completed = true;
        }
      });
      return [...userProjects];
    });

  /**
   * Marks all user projects as completed, which are older than 24 hours
   */
  const onCheckOld = () =>
    setUserProjects((userProjects) => {
      userProjects.forEach((userProject) => {
        if (
          !userProject.completed &&
          isOlderThanHours(userProject.project.publishedAt, 24)
        ) {
          userProject.completed = true;
        }
      });
      return [...userProjects];
    });

  const onUserProjectChecked = (userProject: IUserProject) =>
    setUserProjects((previous) => {
      userProject.completed = true;
      userProject.completedAt = new Date().toISOString() as unknown as Date;
      return [...previous];
    });

  const onUserProjectUnchecked = (userProject: IUserProject) =>
    setUserProjects((previous) => {
      userProject.completed = false;
      userProject.completedAt = undefined;
      return [...previous];
    });

  const onReload = () => loadUserProjects(true);

  const onToggleDisplaySettings = () =>
    setDisplaySettings((previous) => {
      previous = !previous;
      setUserConfig((userConfig) => {
        return { ...userConfig, displaySettings: previous };
      });
      return previous;
    });

  const onSelectUserProject = (userProject: IUserProject) => {
    setSelectedUserProject((previous) => {
      // if selected project shouldn't be displayed, set it to undefined
      if (userConfig.openLinkInline === false) {
        return undefined;
      }

      // same project was clicked. Unselect all projects
      if (previous?.id === userProject.id) {
        return undefined;
      }
      return userProject;
    });
  };

  const onUserProjectChanged = (userProject: IUserProject) => {
    setUserProjects((previous) => {
      const index = previous.findIndex((item) => item.id === userProject.id);
      if (index !== -1) {
        previous.splice(index, 1, userProject);
      }
      return [...previous];
    });
  };

  const onSetAppliedUserProjectsCollapsed = () =>
    setAppliedUserProjectsCollapsed((previous) => {
      previous = !previous;
      setUserConfig((userConfig) => {
        userConfig.collapseApplied = previous;
        return { ...userConfig };
      });
      return previous;
    });

  const onSetTrashUserProjectsCollapsed = () =>
    setTrashUserProjectsCollapsed((previous) => {
      previous = !previous;
      setUserConfig((userConfig) => {
        userConfig.collapseTrash = previous;
        return { ...userConfig };
      });
      return previous;
    });

  const needsDisplaySelectedUserProject =
    selectedUserProject && userConfig.openLinkInline === true;

  return {
    appliedUserProjects,
    appliedUserProjectsCollapsed,
    displaySettings,
    isLoading: request.isLoading,
    loadUserProjects,
    needsDisplaySelectedUserProject,
    onSelectUserProject,
    onCheckAll,
    onCheckOld,
    onUserProjectChanged,
    onUserProjectChecked,
    onUserProjectUnchecked,
    onReload,
    onSetAppliedUserProjectsCollapsed,
    onSetTrashUserProjectsCollapsed,
    onToggleDisplaySettings,
    openUserProjects,
    selectedUserProject,
    trashUserProjects,
    trashUserProjectsCollapsed,
  };
};
