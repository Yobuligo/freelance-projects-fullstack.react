import { useState } from "react";
import { ReportApi } from "../../../../api/ReportApi";
import { DateTimeSpanFilter } from "../../../../components/dateTimeSpanFilter/DateTimeSpanFilter";
import { Spinner } from "../../../../components/spinner/Spinner";
import { useRequest } from "../../../../hooks/useRequest";
import { ITimeSheet } from "../../../../shared/model/ITimeSheet";
import { TimeSheetList } from "../timeSheetList/TimeSheetList";
import { IReportSectionProps } from "./IReportSectionProps";
import styles from "./ReportSection.module.scss";

export const ReportSection: React.FC<IReportSectionProps> = (props) => {
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

  return (
    <div className={styles.reportSection}>
      <div className={styles.timePeriodFilter}>
        <DateTimeSpanFilter
          onChange={onDateTimeSpanChanged}
          onApply={onFetchTimeSheets}
        />
      </div>
      {timeSheetRequest.isProcessing ? (
        <Spinner />
      ) : (
        <TimeSheetList timeSheets={timeSheets} />
      )}
    </div>
  );
};
