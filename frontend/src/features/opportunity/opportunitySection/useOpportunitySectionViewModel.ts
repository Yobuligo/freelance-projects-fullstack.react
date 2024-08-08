import { useMemo, useState } from "react";
import { UserOpportunityApi } from "../../../api/UserOpportunityApi";
import { DateTime } from "../../../core/services/date/DateTime";
import { useRequest } from "../../../hooks/useRequest";
import { useUserConfig } from "../../../hooks/useUserConfig";
import { useUserOpportunities } from "../../../hooks/useUserOpportunities";
import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";
import { isOlderThanHours } from "../../../utils/isOlderThan";
import { sortUserOpportunities } from "../../../utils/sortUserOpportunities";
import { setUserOpportunityCompleted } from "../utils/setUserOpportunityCompleted";
import { setUserOpportunityInCompleted } from "../utils/setUserOpportunityInCompleted";

export const useOpportunitySectionViewModel = () => {
  const request = useRequest();
  const [userOpportunities, setUserOpportunities] = useUserOpportunities();
  const [userConfig, setUserConfig] = useUserConfig();
  const [displaySettings, setDisplaySettings] = useState(
    userConfig.displaySettings
  );
  const [selectedUserOpportunity, setSelectedUserOpportunity] = useState<
    IUserOpportunity | undefined
  >(undefined);
  const [
    appliedUserOpportunitiesCollapsed,
    setAppliedUserOpportunitiesCollapsed,
  ] = useState(userConfig.collapseApplied ?? true);
  const [trashUserOpportunitiesCollapsed, setTrashUserOpportunitiesCollapsed] =
    useState(userConfig.collapseTrash ?? true);

  /**
   * Returns a list of opportunities, which are not open, so not marked as completed or applied to
   */
  const openUserOpportunities = useMemo(
    () =>
      userOpportunities.filter((userOpportunity) => !userOpportunity.completed),
    [userOpportunities]
  );

  /**
   * Returns a list of opportunities, the user has applied to
   */
  const appliedUserOpportunities = useMemo(
    () =>
      userOpportunities
        .filter(
          (userOpportunity) =>
            userOpportunity.completed && userOpportunity.applied
        )
        .sort(sortUserOpportunities),
    [userOpportunities]
  );

  /**
   * Returns a list of opportunities, the user has marked as completed, those who are not interesting
   */
  const trashUserOpportunities = useMemo(
    () =>
      userOpportunities
        .filter(
          (userOpportunity) =>
            userOpportunity.completed && !userOpportunity.applied
        )
        .sort(sortUserOpportunities),
    [userOpportunities]
  );

  const updateUserOpportunities = async (
    userOpportunities: IUserOpportunity[]
  ) => {
    if (userOpportunities.length === 0) {
      return;
    }
    const userOpportunityApi = new UserOpportunityApi();
    await userOpportunityApi.updateAll(userOpportunities);
  };

  const updateUserOpportunity = async (userOpportunity: IUserOpportunity) => {
    const userOpportunities = [userOpportunity];
    await updateUserOpportunities(userOpportunities);
  };

  /**
   * Loads user opportunities from providers and merges it with the data from the local storage
   * If opportunities are already available take these opportunities, otherwise create new instances
   */
  const loadUserOpportunities = async (force?: boolean) => {
    await request.send(async () => {
      const userOpportunityApi = new UserOpportunityApi();
      const fetchedUserOpportunities = (
        await userOpportunityApi.findAllByProviderRequests(force)
      ).sort((left, right) =>
        DateTime.compare(
          right.opportunity.publishedAt,
          left.opportunity.publishedAt
        )
      );
      setUserOpportunities(fetchedUserOpportunities);
    });
  };

  /**
   * Marks all user opportunities as completed
   */
  const onCheckAll = () =>
    setUserOpportunities((userOpportunities) => {
      const toBeUpdatedUserOpportunities: IUserOpportunity[] = [];
      userOpportunities.forEach((userOpportunity) => {
        if (!userOpportunity.completed) {
          setUserOpportunityCompleted(userOpportunity);
          toBeUpdatedUserOpportunities.push(userOpportunity);
        }
      });

      updateUserOpportunities(toBeUpdatedUserOpportunities);
      return [...userOpportunities];
    });

  /**
   * Marks all user opportunities as completed, which are older than 24 hours
   */
  const onCheckOld = () =>
    setUserOpportunities((userOpportunities) => {
      const toBeUpdatedUserOpportunities: IUserOpportunity[] = [];
      userOpportunities.forEach((userOpportunity) => {
        if (
          !userOpportunity.completed &&
          isOlderThanHours(userOpportunity.opportunity.publishedAt, 24)
        ) {
          setUserOpportunityCompleted(userOpportunity);
          toBeUpdatedUserOpportunities.push(userOpportunity);
        }
      });

      updateUserOpportunities(toBeUpdatedUserOpportunities);
      return [...userOpportunities];
    });

  const onUserOpportunityChecked = (userOpportunity: IUserOpportunity) => {
    setUserOpportunities((previous) => {
      setUserOpportunityCompleted(userOpportunity);
      updateUserOpportunity(userOpportunity);
      return [...previous];
    });
  };

  const onUserOpportunityUnchecked = (userOpportunity: IUserOpportunity) => {
    setUserOpportunities((previous) => {
      setUserOpportunityInCompleted(userOpportunity);
      updateUserOpportunity(userOpportunity);
      return [...previous];
    });
  };

  const onReload = () => loadUserOpportunities(true);

  const onToggleDisplaySettings = () =>
    setDisplaySettings((previous) => {
      previous = !previous;
      setUserConfig((userConfig) => {
        return { ...userConfig, displaySettings: previous };
      });
      return previous;
    });

  const onSelectUserOpportunity = (userOpportunity: IUserOpportunity) => {
    setSelectedUserOpportunity((previous) => {
      // if selected opportunity shouldn't be displayed, set it to undefined
      if (userConfig.openLinkInline === false) {
        return undefined;
      }

      // same opportunity was clicked. Unselect all opportunities
      if (previous?.id === userOpportunity.id) {
        return undefined;
      }
      return userOpportunity;
    });
  };

  const onUserOpportunityChanged = (userOpportunity: IUserOpportunity) => {
    setUserOpportunities((previous) => {
      const index = previous.findIndex(
        (item) => item.id === userOpportunity.id
      );
      if (index !== -1) {
        previous.splice(index, 1, userOpportunity);
      }
      updateUserOpportunity(userOpportunity);
      return [...previous];
    });
  };

  const onSetAppliedUserOpportunitiesCollapsed = () =>
    setAppliedUserOpportunitiesCollapsed((previous) => {
      previous = !previous;
      setUserConfig((userConfig) => {
        userConfig.collapseApplied = previous;
        return { ...userConfig };
      });
      return previous;
    });

  const onSetTrashUserOpportunitiesCollapsed = () =>
    setTrashUserOpportunitiesCollapsed((previous) => {
      previous = !previous;
      setUserConfig((userConfig) => {
        userConfig.collapseTrash = previous;
        return { ...userConfig };
      });
      return previous;
    });

  const needsDisplaySelectedUserOpportunity =
    selectedUserOpportunity && userConfig.openLinkInline === true;

  return {
    appliedUserOpportunities: appliedUserOpportunities,
    appliedUserOpportunitiesCollapsed: appliedUserOpportunitiesCollapsed,
    displaySettings,
    isLoading: request.isLoading,
    loadUserOpportunities,
    needsDisplaySelectedUserOpportunity,
    onSelectUserOpportunity,
    onCheckAll,
    onCheckOld,
    onUserOpportunityChanged,
    onUserOpportunityChecked,
    onUserOpportunityUnchecked,
    onReload,
    onSetAppliedUserOpportunitiesCollapsed,
    onSetTrashUserOpportunitiesCollapsed,
    onToggleDisplaySettings,
    openUserOpportunities,
    selectedUserOpportunity,
    trashUserOpportunities,
    trashUserOpportunitiesCollapsed,
  };
};
