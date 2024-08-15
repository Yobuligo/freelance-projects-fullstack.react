import { TimePeriodFilter } from "../../../../components/timePeriodFilter/TimePeriodFilter";
import { IReportSectionProps } from "./IReportSectionProps";
import styles from "./ReportSection.module.scss";

export const ReportSection: React.FC<IReportSectionProps> = (props) => {
  return (
    <div className={styles.reportSection}>
      <TimePeriodFilter />
    </div>
  );
};
