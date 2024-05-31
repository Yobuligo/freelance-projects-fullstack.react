import { useContext } from "react";
import { Card } from "../../../components/card/Card";
import { ProviderRequestList } from "../../providerRequest/providerRequestList/ProviderRequestList";
import { AppContext } from "../../../context/AppContext";
import { useSettings } from "../../../hooks/useSettings";

export const SettingsSection: React.FC = () => {
  const [settings, setSettings] = useSettings();

  return (
    <Card>
      <ProviderRequestList providerRequests={settings.providerRequests} />
    </Card>
  );
};
