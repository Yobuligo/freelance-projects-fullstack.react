import { IToggleButtonOption } from "../../../components/toggleButtonGroup/IToggleButtonOption";
import { ToggleButtonGroup } from "../../../components/toggleButtonGroup/ToggleButtonGroup";
import { useRenderTimeUnit } from "../../../hooks/useRenderTimeUnit";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { TimeUnit } from "../../../types/TimeUnit";
import { Settings } from "../../settings/settings/Settings";
import { SettingsSection } from "../../settings/settingsSection/SettingsSection";
import { ITimeTrackerSettingsProps } from "./ITimeTrackerSettingsProps";
import styles from "./TimeTrackerSettings.module.scss";

export const TimeTrackerSettings: React.FC<ITimeTrackerSettingsProps> = (
  props
) => {
  const { t } = useTranslation();
  const renderTimeUnit = useRenderTimeUnit();

  const options: IToggleButtonOption<TimeUnit>[] = [
    { key: TimeUnit.DAYS, text: renderTimeUnit(TimeUnit.DAYS) },
    { key: TimeUnit.HOURS, text: renderTimeUnit(TimeUnit.HOURS) },
    { key: TimeUnit.WORKING_DAYS, text: renderTimeUnit(TimeUnit.WORKING_DAYS) },
  ];

  return (
    <div className={styles.timeTrackerSettings}>
      <Settings>
        <SettingsSection title={t(texts.timeTrackerSettings.general)}>
          <ToggleButtonGroup items={options} />
        </SettingsSection>
      </Settings>
    </div>
  );
};
