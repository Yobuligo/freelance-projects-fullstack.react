import { Card } from "../../components/card/Card";
import { ProviderRequestInput } from "../providerRequest/providerRequestInput/ProviderRequestInput";
import { ProviderRequestList } from "../providerRequest/providerRequestList/ProviderRequestList";
import styles from "./SettingsSection.module.scss";
import { useSettingsSectionViewModel } from "./useSettingsSectionViewModel";

export const SettingsSection: React.FC = () => {
  const viewModel = useSettingsSectionViewModel();

  return (
    <Card className={styles.settingsSection}>
      <div className={styles.providerRequestInput}>
        <ProviderRequestInput onAdd={viewModel.onAddProviderRequest} />
      </div>
      <ProviderRequestList
        providerRequests={viewModel.settings.providerRequests}
        onDelete={viewModel.onDeleteProviderRequest}
      />
    </Card>
  );
};
