import { Settings } from "../../settings/settings/Settings";
import { ITimeTrackerSettingsProps } from "./ITimeTrackerSettingsProps";
import styles from "./TimeTrackerSettings.module.scss";

export const TimeTrackerSettings: React.FC<ITimeTrackerSettingsProps> = (
  props
) => {
  return (
    <div className={styles.timeTrackerSettings}>
      <Settings />
    </div>
  );
};
