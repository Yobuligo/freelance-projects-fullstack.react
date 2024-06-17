import { v4 as uuid } from "uuid";
import { useSettings } from "../../hooks/useSettings";
import { IProviderRequest } from "../../model/IProviderRequest";
import { ProviderType } from "../../shared/types/ProviderType";

export const useSettingsSectionViewModel = () => {
  const [settings, setSettings] = useSettings();

  const onAddProviderRequest = (
    providerType: ProviderType,
    providerUrl: string,
    requestTitle: string
  ) => {
    setSettings((previous) => {
      previous.providerRequests.push({
        id: uuid(),
        enabled: true,
        providerType,
        providerUrl,
        requestTitle,
      });
      return { ...previous };
    });
  };

  const onDeleteProviderRequest = (providerRequest: IProviderRequest) => {
    setSettings((previous) => {
      const index = previous.providerRequests.findIndex(
        (item) => item.id === providerRequest.id
      );
      if (index !== -1) {
        previous.providerRequests.splice(index, 1);
      }
      return { ...previous };
    });
  };

  const onUpdateProviderRequest = (providerRequest: IProviderRequest) => {
    setSettings((previous) => {
      const index = previous.providerRequests.findIndex(
        (item) => item.id === providerRequest.id
      );
      if (index !== -1) {
        previous.providerRequests.splice(index, 1, providerRequest);
      }
      return { ...previous };
    });
  };

  return {
    onAddProviderRequest,
    onDeleteProviderRequest,
    onDisableProviderRequest: onUpdateProviderRequest,
    onEnableProviderRequest: onUpdateProviderRequest,
    settings,
  };
};
