import { ToggleButtonGroup } from "../../../components/toggleButtonGroup/ToggleButtonGroup";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { Settings } from "../../settings/settings/Settings";
import { SettingsSection } from "../../settings/settingsSection/SettingsSection";
import { ITimeTrackerSettingsProps } from "./ITimeTrackerSettingsProps";
import styles from "./TimeTrackerSettings.module.scss";
import { useTimeTrackerSettingsViewModel } from "./useTimeTrackerSettingsViewModel";

export const TimeTrackerSettings: React.FC<ITimeTrackerSettingsProps> = (
  props
) => {
  const viewModel = useTimeTrackerSettingsViewModel();
  const { t } = useTranslation();

  return (
    <div className={styles.timeTrackerSettings}>
      <Settings>
        <SettingsSection title={t(texts.timeTrackerSettings.general)}>
          <ToggleButtonGroup
            items={viewModel.timeUnitOptions}
            onSelect={viewModel.onSelectTimeUnit}
            selected={viewModel.selectedTimeUnit}
          />
        </SettingsSection>
      </Settings>
    </div>
  );
};
