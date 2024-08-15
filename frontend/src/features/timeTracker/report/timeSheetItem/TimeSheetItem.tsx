import { Card } from "../../../../components/card/Card";
import { DurationDisplay } from "../../../../components/duration/DurationDisplay";
import { Duration } from "../../../../core/services/date/Duration";
import { ITimeSheetItemProps } from "./ITimeSheetItemProps";
import styles from "./TimeSheetItem.module.scss";

export const TimeSheetItem: React.FC<ITimeSheetItemProps> = (props) => {
  return (
    <Card className={styles.timeSheetItem}>
      <div className={styles.title}>{props.timeSheet.project.title}</div>
      <div className={styles.duration}>
        <DurationDisplay
          duration={new Duration(props.timeSheet.durationInMilliseconds)}
          title="Total spent time"
        />
      </div>
    </Card>
  );
};
