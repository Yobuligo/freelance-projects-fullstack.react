import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { Card } from "../../components/card/Card";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { ProviderRequestInput } from "../providerRequest/providerRequestInput/ProviderRequestInput";
import { ProviderRequestList } from "../providerRequest/providerRequestList/ProviderRequestList";
import styles from "./Settings.module.scss";
import { SettingsList } from "./settingsList/SettingsList";
import { useSettingsViewModel } from "./useSettingsViewModel";

export const Settings: React.FC = () => {
  const viewModel = useSettingsViewModel();
  const { t } = useTranslation();

  return (
    <Card className={styles.settings}>
      <div className={styles.title}>
        <SettingsIcon className={styles.icon} />
        <h1>{t(texts.settingsSection.title)}</h1>
      </div>
      <div className={styles.settingsContent}>
        <div>
          <h2 className={styles.settingsHeaders}>
            {t(texts.settingsSection.addNewSearchUrl)}
          </h2>
          <div className={styles.providerRequestInput}>
            <ProviderRequestInput onAdd={viewModel.onAddProviderRequest} />
          </div>
        </div>
        <div>
          <h2 className={styles.settingsHeaders}>
            {t(texts.settingsSection.savedSearches)}
          </h2>
          <div className={styles.providerRequestList}>
            <ProviderRequestList
              providerRequests={viewModel.settings.providerRequests}
              onDelete={viewModel.onDeleteProviderRequest}
              onDisable={viewModel.onDisableProviderRequest}
              onEnable={viewModel.onEnableProviderRequest}
            />
          </div>
        </div>
        <div>
          <h2 className={styles.settingsHeaders}>
            {t(texts.settingsSection.generalSettings.caption)}
          </h2>
          <div className={styles.settingsList}>
            <SettingsList />
          </div>
        </div>
      </div>
    </Card>
  );
};
