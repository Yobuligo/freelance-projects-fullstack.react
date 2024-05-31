import { Card } from "../../../components/card/Card";
import { useSettings } from "../../../hooks/useSettings";
import { ProviderType } from "../../../shared/types/ProviderType";
import { ProviderRequestInput } from "../../providerRequest/providerRequestInput/ProviderRequestInput";
import { ProviderRequestList } from "../../providerRequest/providerRequestList/ProviderRequestList";

export const SettingsSection: React.FC = () => {
  const [settings, setSettings] = useSettings();

  const onAddProviderRequest = (
    providerType: ProviderType,
    providerUrl: string
  ) => {
    setSettings((previous) => {
      previous.providerRequests.push({
        providerType: providerType,
        providerUrl: providerUrl,
      });
      return { ...previous };
    });
  };

  return (
    <Card>
      <ProviderRequestInput onAdd={onAddProviderRequest} />
      <ProviderRequestList providerRequests={settings.providerRequests} />
    </Card>
  );
};
