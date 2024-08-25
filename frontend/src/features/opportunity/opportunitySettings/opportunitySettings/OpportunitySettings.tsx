import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { ProviderRequestInput } from "../../../providerRequest/providerRequestInput/ProviderRequestInput";
import { ProviderRequestList } from "../../../providerRequest/providerRequestList/ProviderRequestList";
import { Settings } from "../../../settings/settings/Settings";
import { SettingsSection } from "../../../settings/settingsSection/SettingsSection";
import { OpportunitySettingsConfigList } from "../opportunitySettingsConfigList/OpportunitySettingsConfigList";
import { useOpportunitySettingsViewModel } from "../useOpportunitySettingsViewModel";
import styles from "./OpportunitySettings.module.scss";

export const OpportunitySettings: React.FC = () => {
  const viewModel = useOpportunitySettingsViewModel();
  const { t } = useTranslation();

  return (
    <Settings>
      <div>
        <SettingsSection title={t(texts.opportunitySettings.addNewSearchUrl)}>
          <ProviderRequestInput
            onAdd={viewModel.onAddUserProviderRequest}
            className={styles.settingsSectionFirstElement}
          />
        </SettingsSection>
      </div>
      <div>
        <SettingsSection title={t(texts.opportunitySettings.savedSearches)}>
          <div className={styles.settingsSectionFirstElement}>
            <ProviderRequestList
              isLoading={viewModel.loadUserProviderRequestRequest.isProcessing}
              onDelete={viewModel.onDeleteUserProviderRequest}
              onDisable={viewModel.onUpdateUserProviderRequest}
              onEnable={viewModel.onEnableUserProviderRequest}
              userProviderRequests={viewModel.userProviderRequests}
            />
          </div>
        </SettingsSection>
      </div>
      <div>
        <SettingsSection title={t(texts.general.generalSettings)}>
          <OpportunitySettingsConfigList
            className={styles.settingsSectionFirstElement}
          />
        </SettingsSection>
      </div>
    </Settings>
  );
};
