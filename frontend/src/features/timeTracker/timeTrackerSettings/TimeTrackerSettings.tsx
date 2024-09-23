import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { Settings } from "../../settings/settings/Settings";
import { SettingsSection } from "../../settings/settingsSection/SettingsSection";
import { ITimeTrackerSettingsProps } from "./ITimeTrackerSettingsProps";
import styles from "./TimeTrackerSettings.module.scss";

export const TimeTrackerSettings: React.FC<ITimeTrackerSettingsProps> = (
  props
) => {
  const { t } = useTranslation();

  return (
    <div className={styles.timeTrackerSettings}>
      <Settings>
        <SettingsSection title={t(texts.timeTrackerSettings.general)}>
          Hello World
        </SettingsSection>
      </Settings>
    </div>
  );
};
