import { useMemo, useState } from "react";
import { UserProjectApi } from "../../../api/UserProjectApi";
import { useRequest } from "../../../hooks/useRequest";
import { useUserConfig } from "../../../hooks/useUserConfig";
import { useUserProjects } from "../../../hooks/useUserProjects";
import { useUserProviderRequests } from "../../../hooks/useUserProviderRequests";
import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";
import { isOlderThanHours } from "../../../utils/isOlderThan";
import { sortUserProjects } from "../../../utils/sortUserProjects";
import { setUserProjectCompleted } from "../utils/setUserProjectCompleted";
import { setUserProjectInCompleted } from "../utils/setUserProjectInCompleted";

export const useProjectSectionViewModel = () => {
  const request = useRequest();
  const [userProjects, setUserProjects] = useUserProjects();
  const [userConfig, setUserConfig] = useUserConfig();
  const [displaySettings, setDisplaySettings] = useState(
    userConfig.displaySettings
  );
  const [userProviderRequests] = useUserProviderRequests();
  const [selectedUserProject, setSelectedUserProject] = useState<
    IUserOpportunity | undefined
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

  const updateUserProjects = async (userProjects: IUserOpportunity[]) => {
    if (userProjects.length === 0) {
      return;
    }
    const userProjectApi = new UserProjectApi();
    await userProjectApi.updateAll(userProjects);
  };

  const updateUserProject = async (userProject: IUserOpportunity) => {
    const userProjects = [userProject];
    await updateUserProjects(userProjects);
  };

  /**
   * Loads user projects from providers and merges it with the data from the local storage
   * If projects are already available take these projects, otherwise create new instances
   */
  const loadUserProjects = async (force?: boolean) => {
    await request.send(async () => {
      const enabledUserProviderRequests = userProviderRequests.filter(
        (item) => item.enabled === true
      );
      const projectApi = new UserProjectApi();
      const fetchedUserProjects = await projectApi.findAllByProviderRequests(
        enabledUserProviderRequests,
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
      const toBeUpdatedUserProjects: IUserOpportunity[] = [];
      userProjects.forEach((userProject) => {
        if (!userProject.completed) {
          setUserProjectCompleted(userProject);
          toBeUpdatedUserProjects.push(userProject);
        }
      });

      updateUserProjects(toBeUpdatedUserProjects);
      return [...userProjects];
    });

  /**
   * Marks all user projects as completed, which are older than 24 hours
   */
  const onCheckOld = () =>
    setUserProjects((userProjects) => {
      const toBeUpdatedUserProjects: IUserOpportunity[] = [];
      userProjects.forEach((userProject) => {
        if (
          !userProject.completed &&
          isOlderThanHours(userProject.project.publishedAt, 24)
        ) {
          setUserProjectCompleted(userProject);
          toBeUpdatedUserProjects.push(userProject);
        }
      });

      updateUserProjects(toBeUpdatedUserProjects);
      return [...userProjects];
    });

  const onUserProjectChecked = (userProject: IUserOpportunity) => {
    setUserProjects((previous) => {
      setUserProjectCompleted(userProject);
      updateUserProject(userProject);
      return [...previous];
    });
  };

  const onUserProjectUnchecked = (userProject: IUserOpportunity) => {
    setUserProjects((previous) => {
      setUserProjectInCompleted(userProject);
      updateUserProject(userProject);
      return [...previous];
    });
  };

  const onReload = () => loadUserProjects(true);

  const onToggleDisplaySettings = () =>
    setDisplaySettings((previous) => {
      previous = !previous;
      setUserConfig((userConfig) => {
        return { ...userConfig, displaySettings: previous };
      });
      return previous;
    });

  const onSelectUserProject = (userProject: IUserOpportunity) => {
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

  const onUserProjectChanged = (userProject: IUserOpportunity) => {
    setUserProjects((previous) => {
      const index = previous.findIndex((item) => item.id === userProject.id);
      if (index !== -1) {
        previous.splice(index, 1, userProject);
      }
      updateUserProject(userProject);
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
