import { Card } from "../../../components/card/Card";
import { ProviderRequestInput } from "../../providerRequest/providerRequestInput/ProviderRequestInput";
import { ProviderRequestList } from "../../providerRequest/providerRequestList/ProviderRequestList";
import { useSettingsSectionViewModel } from "./useSettingsSectionViewModel";

export const SettingsSection: React.FC = () => {
  const viewModel = useSettingsSectionViewModel();

  return (
    <Card>
      <ProviderRequestInput onAdd={viewModel.onAddProviderRequest} />
      <ProviderRequestList
        providerRequests={viewModel.settings.providerRequests}
        onDelete={viewModel.onDeleteProviderRequest}
      />
    </Card>
  );
};
