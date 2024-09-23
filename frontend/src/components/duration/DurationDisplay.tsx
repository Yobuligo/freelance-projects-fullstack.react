import { Duration } from "../../core/services/date/Duration";
import { style } from "../../core/ui/style";
import { useTimeTrackerSettings } from "../../hooks/useTimeTrackerSettings";
import { NotSupportedError } from "../../shared/errors/NotSupportedError";
import { TimeUnit } from "../../types/TimeUnit";
import styles from "./DurationDisplay.module.scss";
import { IDurationDisplayProps } from "./IDurationDisplayProps";

const formatDays = (duration: Duration): string => {
  return `${duration.days ? `${duration.days}d ` : ``}${
    duration.hours ? `${duration.hours}h` : ``
  } ${duration.minutes ? `${duration.minutes}m` : ``} ${duration.seconds}s`;
};

const formatWorkingDays = (duration: Duration): string => {
  duration.hoursInDay = 8;
  return formatDays(duration);
};

const formatHours = (duration: Duration): string => {
  return `${duration.totalHours ? `${duration.totalHours}h` : ``} ${
    duration.minutes ? `${duration.minutes}m` : ``
  } ${duration.seconds}s`;
};

export const DurationDisplay: React.FC<IDurationDisplayProps> = (props) => {
  const [timeTrackerSettings] = useTimeTrackerSettings();

  const renderDuration = () => {
    switch (timeTrackerSettings.selectedTimeUnit) {
      case TimeUnit.DAYS:
        return formatDays(props.duration);
      case TimeUnit.HOURS:
        return formatHours(props.duration);
      case TimeUnit.WORKING_DAYS:
        return formatWorkingDays(props.duration);
      default:
        throw new NotSupportedError();
    }
  };

  return (
    <div className={styles.duration}>
      <div className={props.classNameTitle}>{props.title}</div>
      <div className={style(styles.time, props.classNameDuration)}>
        {renderDuration()}
      </div>
    </div>
  );
};
