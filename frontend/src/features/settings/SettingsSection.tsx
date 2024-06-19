import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { Card } from "../../components/card/Card";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { ProviderRequestInput } from "../providerRequest/providerRequestInput/ProviderRequestInput";
import { ProviderRequestList } from "../providerRequest/providerRequestList/ProviderRequestList";
import styles from "./SettingsSection.module.scss";
import { AppSettings } from "./appSettings/AppSettings";
import { useSettingsSectionViewModel } from "./useSettingsSectionViewModel";

export const SettingsSection: React.FC = () => {
  const viewModel = useSettingsSectionViewModel();
  const { t } = useTranslation();

  return (
    <Card className={styles.settingsSection}>
      <div className={styles.title}>
        <SettingsIcon className={styles.icon} />
        <h1>{t(texts.settingsSection.title)}</h1>
      </div>
      <div className={styles.settingsContent}>
        <div>
          <h2 className={styles.settingsSectionHeaders}>
            {t(texts.settingsSection.addNewSearchUrl)}
          </h2>
          <div className={styles.providerRequestInput}>
            <ProviderRequestInput onAdd={viewModel.onAddProviderRequest} />
          </div>
        </div>
        <div>
          <h2 className={styles.settingsSectionHeaders}>
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
          <h2 className={styles.settingsSectionHeaders}>
            {t(texts.settingsSection.appSettings.caption)}
          </h2>
          <div className={styles.appSettings}>
            <AppSettings />
          </div>
        </div>
      </div>
    </Card>
  );
};
