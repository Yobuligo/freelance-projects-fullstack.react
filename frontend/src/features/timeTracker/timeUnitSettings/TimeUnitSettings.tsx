import { ToggleButtonGroup } from "../../../components/toggleButtonGroup/ToggleButtonGroup";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { SettingsSection } from "../../settings/settingsSection/SettingsSection";
import { useTimeTrackerSettingsViewModel } from "./useTimeUnitSettingsViewModel";

export const TimeUnitSettings: React.FC = () => {
  const viewModel = useTimeTrackerSettingsViewModel();
  const { t } = useTranslation();

  return (
    <SettingsSection title={t(texts.timeTrackerSettings.timeUnit)}>
      <ToggleButtonGroup
        items={viewModel.timeUnitOptions}
        onSelect={viewModel.onSelectTimeUnit}
        selected={viewModel.selectedTimeUnit}
      />
    </SettingsSection>
  );
};
