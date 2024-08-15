import { isInitial } from "../../../../core/utils/isInitial";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { TimeSheetItem } from "../timeSheetItem/TimeSheetItem";
import { ITimeSheetListProps } from "./ITimeSheetListProps";
import styles from "./TimeSheetList.module.scss";

export const TimeSheetList: React.FC<ITimeSheetListProps> = (props) => {
  const { t } = useTranslation();

  const items = props.timeSheets.map((timeSheet, index) => (
    <TimeSheetItem key={index} timeSheet={timeSheet} />
  ));

  return (
    <div className={styles.timeSheetList}>
      {isInitial(items) ? t(texts.timeSheetList.noTimeSheetsFound) : items}
    </div>
  );
};
