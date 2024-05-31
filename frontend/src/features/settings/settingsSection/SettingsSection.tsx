import { Card } from "../../../components/card/Card";
import { useSettings } from "../../../hooks/useSettings";
import { ProviderRequestInput } from "../../providerRequest/providerRequestInput/ProviderRequestInput";
import { ProviderRequestList } from "../../providerRequest/providerRequestList/ProviderRequestList";

export const SettingsSection: React.FC = () => {
  const [settings, setSettings] = useSettings();

  return (
    <Card>
      <ProviderRequestInput />
      <ProviderRequestList providerRequests={settings.providerRequests} />
    </Card>
  );
};
