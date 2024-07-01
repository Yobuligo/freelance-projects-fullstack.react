import { ReactComponent as SettingsIcon } from "../../../assets/settings.svg";
import { Card } from "../../../components/card/Card";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { ProviderRequestInput } from "../../providerRequest/providerRequestInput/ProviderRequestInput";
import { ProviderRequestList } from "../../providerRequest/providerRequestList/ProviderRequestList";
import { SettingsConfigList } from "../settingsConfigList/SettingsConfigList";
import { SettingsSection } from "../settingsSection/SettingsSection";
import { SettingsTransfer } from "../settingsTransfer/SettingsTransfer";
import styles from "./Settings.module.scss";
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
        <SettingsSection title={t(texts.settingsSection.dataTransfer)}>
          <SettingsTransfer />
        </SettingsSection>
        <SettingsSection title={t(texts.settingsSection.addNewSearchUrl)}>
          <ProviderRequestInput onAdd={viewModel.onAddProviderRequest} />
        </SettingsSection>
        <SettingsSection title={t(texts.settingsSection.savedSearches)}>
          <ProviderRequestList
            providerRequests={viewModel.settings.providerRequests}
            onDelete={viewModel.onDeleteProviderRequest}
            onDisable={viewModel.onDisableProviderRequest}
            onEnable={viewModel.onEnableProviderRequest}
          />
        </SettingsSection>
        <SettingsSection
          title={t(texts.settingsSection.generalSettings.caption)}
        >
          <SettingsConfigList />
        </SettingsSection>
      </div>
    </Card>
  );
};
