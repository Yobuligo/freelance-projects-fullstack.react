import { useState } from "react";
import { ReportApi } from "../../../../api/ReportApi";
import { DateTimeSpanFilter } from "../../../../components/dateTimeSpanFilter/DateTimeSpanFilter";
import { DurationDisplay } from "../../../../components/duration/DurationDisplay";
import { Spinner } from "../../../../components/spinner/Spinner";
import { Duration } from "../../../../core/services/date/Duration";
import { useRequest } from "../../../../hooks/useRequest";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { ITimeSheet } from "../../../../shared/model/ITimeSheet";
import { TimeTrackerSettings } from "../../timeTrackerSettings/TimeTrackerSettings";
import { TimeSheetList } from "../timeSheetList/TimeSheetList";
import { IReportSectionProps } from "./IReportSectionProps";
import styles from "./ReportSection.module.scss";

export const ReportSection: React.FC<IReportSectionProps> = (props) => {
  const { t } = useTranslation();
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [timeSheets, setTimeSheets] = useState<ITimeSheet[]>([]);
  const timeSheetRequest = useRequest();

  const onFetchTimeSheets = async () => {
    if (fromDate && toDate) {
      timeSheetRequest.send(async () => {
        const reportApi = new ReportApi();
        const timeSheets = await reportApi.findTimeSheets({
          from: fromDate,
          to: toDate,
        });
        setTimeSheets(timeSheets);
      });
    }
  };

  const onDateTimeSpanChanged = (from: Date, to: Date) => {
    setFromDate(from);
    setToDate(to);
  };

  const calcTotalDuration = (): Duration => {
    const totalMilliseconds = timeSheets.reduce((sum, timeSheet) => {
      return sum + timeSheet.durationInMilliseconds;
    }, 0);
    return new Duration(totalMilliseconds);
  };

  return (
    <div className={styles.reportSection}>
      {props.displaySettings && <TimeTrackerSettings />}
      <div className={styles.timePeriodFilter}>
        <DateTimeSpanFilter
          onChange={onDateTimeSpanChanged}
          onApply={onFetchTimeSheets}
        />
      </div>
      {timeSheetRequest.isProcessing ? (
        <Spinner />
      ) : (
        <div className={styles.timeSheetList}>
          <div className={styles.total}>
            <DurationDisplay
              duration={calcTotalDuration()}
              title={t(texts.reportSection.totalDuration)}
            />
          </div>
          <TimeSheetList timeSheets={timeSheets} />
        </div>
      )}
    </div>
  );
};
