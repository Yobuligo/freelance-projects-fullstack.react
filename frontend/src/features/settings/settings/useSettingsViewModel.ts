import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useSession } from "../../../hooks/useSession";
import { useUserProviderRequests } from "../../../hooks/useUserProviderRequests";
import { IUserProviderRequest } from "../../../shared/model/IUserProviderRequest";
import { ProviderType } from "../../../shared/types/ProviderType";
import { UserProviderRequestApi } from "./../../../api/UserProviderRequestApi";

export const useSettingsViewModel = () => {
  const [session] = useSession();
  const [isUserProviderRequestsLoading, setIsUserProviderRequestLoading] =
    useState(false);
  const [userProviderRequests, setUserProviderRequests] =
    useUserProviderRequests();

  const loadUserProviderRequests = useCallback(async () => {
    setIsUserProviderRequestLoading(true);
    const userProviderRequestApi = new UserProviderRequestApi();
    const userProviderRequests = await userProviderRequestApi.findAll();
    setUserProviderRequests(userProviderRequests);
    setIsUserProviderRequestLoading(false);
  }, [setUserProviderRequests]);

  useEffect(() => {
    loadUserProviderRequests();
  }, [loadUserProviderRequests]);

  const onAddUserProviderRequest = (
    provider: ProviderType,
    url: string,
    title: string
  ) => {
    const userId = session?.userId;
    if (!userId) {
      throw new Error(
        `Error when adding user provider request. Invalid user session`
      );
    }

    setUserProviderRequests((previous) => {
      const userProviderRequest: IUserProviderRequest = {
        id: uuid(),
        userId,
        enabled: true,
        provider,
        url,
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      previous.push(userProviderRequest);
      const userProviderRequestApi = new UserProviderRequestApi();
      userProviderRequestApi.insert(userProviderRequest);
      return [...previous];
    });
  };

  const onDeleteUserProviderRequest = (
    userProviderRequest: IUserProviderRequest
  ) => {
    setUserProviderRequests((previous) => {
      const index = previous.findIndex(
        (item) => item.id === userProviderRequest.id
      );
      if (index !== -1) {
        previous.splice(index, 1);
      }

      const userProviderRequestApi = new UserProviderRequestApi();
      userProviderRequestApi.deleteById(userProviderRequest.id);
      return [...previous];
    });
  };

  const onUpdateUserProviderRequest = (
    userProviderRequest: IUserProviderRequest
  ) => {
    setUserProviderRequests((previous) => {
      const index = previous.findIndex(
        (item) => item.id === userProviderRequest.id
      );
      if (index !== -1) {
        previous.splice(index, 1, userProviderRequest);
      }
      const userProviderRequestApi = new UserProviderRequestApi();
      userProviderRequestApi.update(userProviderRequest);
      return [...previous];
    });
  };

  return {
    isUserProviderRequestsLoading,
    onAddUserProviderRequest,
    onDeleteUserProviderRequest,
    onUpdateUserProviderRequest,
    onEnableUserProviderRequest: onUpdateUserProviderRequest,
    userProviderRequests,
  };
};
