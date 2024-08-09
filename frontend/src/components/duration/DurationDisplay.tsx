import { Duration } from "../../core/services/date/Duration";
import { style } from "../../utils/style";
import styles from "./DurationDisplay.module.scss";
import { IDurationDisplayProps } from "./IDurationDisplayProps";

const formatDuration = (duration: Duration): string => {
  return `${duration.days ? `${duration.days}d ` : ``}${
    duration.hours ? `${duration.hours}h` : ``
  } ${duration.minutes ? `${duration.minutes}m` : ``} ${duration.seconds}s`;
};

export const DurationDisplay: React.FC<IDurationDisplayProps> = (props) => {
  return (
    <div className={styles.duration}>
      <div className={props.classNameTitle}>{props.title}</div>
      <div className={style(styles.time, props.classNameDuration)}>
        {formatDuration(props.duration)}
      </div>
    </div>
  );
};
