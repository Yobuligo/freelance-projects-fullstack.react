import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { ProviderRequestInput } from "../../../providerRequest/providerRequestInput/ProviderRequestInput";
import { ProviderRequestList } from "../../../providerRequest/providerRequestList/ProviderRequestList";
import { Settings } from "../../../settings/settings/Settings";
import { SettingsSection } from "../../../settings/settingsSection/SettingsSection";
import { OpportunitySettingsConfigList } from "../opportunitySettingsConfigList/OpportunitySettingsConfigList";
import { useOpportunitySettingsViewModel } from "../useOpportunitySettingsViewModel";

export const OpportunitySettings: React.FC = () => {
  const viewModel = useOpportunitySettingsViewModel();
  const { t } = useTranslation();

  return (
    <Settings>
      <SettingsSection title={t(texts.opportunitySettings.addNewSearchUrl)}>
        <ProviderRequestInput onAdd={viewModel.onAddUserProviderRequest} />
      </SettingsSection>
      <SettingsSection title={t(texts.opportunitySettings.savedSearches)}>
        <ProviderRequestList
          isLoading={viewModel.loadUserProviderRequestRequest.isProcessing}
          onDelete={viewModel.onDeleteUserProviderRequest}
          onDisable={viewModel.onUpdateUserProviderRequest}
          onEnable={viewModel.onEnableUserProviderRequest}
          userProviderRequests={viewModel.userProviderRequests}
        />
      </SettingsSection>
      <SettingsSection title={t(texts.general.generalSettings)}>
        <OpportunitySettingsConfigList />
      </SettingsSection>
    </Settings>
  );
};
