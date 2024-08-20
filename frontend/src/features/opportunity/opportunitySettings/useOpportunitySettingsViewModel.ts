import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../hooks/useRequest";
import { useSession } from "../../../hooks/useSession";
import { useUserProviderRequests } from "../../../hooks/useUserProviderRequests";
import { IUserProviderRequest } from "../../../shared/model/IUserProviderRequest";
import { ProviderType } from "../../../shared/types/ProviderType";
import { UserProviderRequestApi } from "../../../api/UserProviderRequestApi";

export const useOpportunitySettingsViewModel = () => {
  const [session] = useSession();
  const [userProviderRequests, setUserProviderRequests] =
    useUserProviderRequests();
  const loadUserProviderRequestRequest = useRequest();
  const request = useRequest();

  const loadUserProviderRequests = useCallback(async () => {
    loadUserProviderRequestRequest.send(async () => {
      const userProviderRequestApi = new UserProviderRequestApi();
      const userProviderRequests = await userProviderRequestApi.findAll();
      setUserProviderRequests(userProviderRequests);
    });
  }, [loadUserProviderRequestRequest, setUserProviderRequests]);

  useInitialize(() => {
    loadUserProviderRequests();
  });

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
      request.send(async () => {
        const userProviderRequestApi = new UserProviderRequestApi();
        await userProviderRequestApi.insert(userProviderRequest);
      });
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

      request.send(async () => {
        const userProviderRequestApi = new UserProviderRequestApi();
        await userProviderRequestApi.deleteById(userProviderRequest.id);
      });
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
      request.send(async () => {
        const userProviderRequestApi = new UserProviderRequestApi();
        await userProviderRequestApi.update(userProviderRequest);
      });
      return [...previous];
    });
  };

  return {
    loadUserProviderRequestRequest,
    onAddUserProviderRequest,
    onDeleteUserProviderRequest,
    onUpdateUserProviderRequest,
    onEnableUserProviderRequest: onUpdateUserProviderRequest,
    userProviderRequests,
  };
};
