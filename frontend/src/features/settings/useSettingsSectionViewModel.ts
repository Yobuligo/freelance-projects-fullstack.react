import { useSettings } from "../../hooks/useSettings";
import { IProviderRequest } from "../../model/IProviderRequest";
import { ProviderType } from "../../shared/types/ProviderType";
import { v4 as uuid } from "uuid";

export const useSettingsSectionViewModel = () => {
  const [settings, setSettings] = useSettings();

  const onAddProviderRequest = (
    providerType: ProviderType,
    providerUrl: string
  ) => {
    setSettings((previous) => {
      previous.providerRequests.push({
        id: uuid(),
        providerType: providerType,
        providerUrl: providerUrl,
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

  return { onAddProviderRequest, onDeleteProviderRequest, settings };
};
