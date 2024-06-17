import { Card } from "../../components/card/Card";
import { ProviderRequestInput } from "../providerRequest/providerRequestInput/ProviderRequestInput";
import { ProviderRequestList } from "../providerRequest/providerRequestList/ProviderRequestList";
import styles from "./SettingsSection.module.scss";
import { useSettingsSectionViewModel } from "./useSettingsSectionViewModel";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";

export const SettingsSection: React.FC = () => {
  const viewModel = useSettingsSectionViewModel();

  return (
    <Card className={styles.settingsSection}>
      <div className={styles.title}>
        <SettingsIcon className={styles.icon} />
        <h1>Settings</h1>
      </div>
      <div className={styles.settingsContent}>
        <div>
          <h2 className={styles.settingsSectionHeaders}>New search url</h2>
          <div className={styles.providerRequestInput}>
            <ProviderRequestInput onAdd={viewModel.onAddProviderRequest} />
          </div>
        </div>
        <div>
          <h2 className={styles.settingsSectionHeaders}>Saved searches</h2>
          <div className={styles.providerRequestList}>
            <ProviderRequestList
              providerRequests={viewModel.settings.providerRequests}
              onDelete={viewModel.onDeleteProviderRequest}
              onDisable={viewModel.onDisableProviderRequest}
              onEnable={viewModel.onEnableProviderRequest}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
