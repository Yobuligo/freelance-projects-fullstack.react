import { useState } from "react";
import { ReportApi } from "../../../../api/ReportApi";
import { Button } from "../../../../components/button/Button";
import { DateTimeSpanFilter } from "../../../../components/dateTimeSpanFilter/DateTimeSpanFilter";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { IReportSectionProps } from "./IReportSectionProps";
import styles from "./ReportSection.module.scss";

export const ReportSection: React.FC<IReportSectionProps> = (props) => {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const { t } = useTranslation();

  const onFetchTimeSheets = async () => {
    if (fromDate && toDate) {
      const reportApi = new ReportApi();
      const result = await reportApi.findTimeSheets({
        from: fromDate,
        to: toDate,
      });
      debugger;
    }
  };

  const onDateTimeSpanChanged = (from: Date, to: Date) => {
    setFromDate(from);
    setToDate(to);
  };
  
  return (
    <div className={styles.reportSection}>
      <div className={styles.timePeriodFilter}>
        <DateTimeSpanFilter onChange={onDateTimeSpanChanged} />
        <Button className={styles.button} onClick={onFetchTimeSheets}>
          {t(texts.general.apply)}
        </Button>
      </div>
    </div>
  );
};
