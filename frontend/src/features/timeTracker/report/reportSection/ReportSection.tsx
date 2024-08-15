import { Button } from "../../../../components/button/Button";
import { TimePeriodFilter } from "../../../../components/timePeriodFilter/TimePeriodFilter";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { IReportSectionProps } from "./IReportSectionProps";
import styles from "./ReportSection.module.scss";

export const ReportSection: React.FC<IReportSectionProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.reportSection}>
      <div className={styles.timePeriodFilter}>
        <TimePeriodFilter />
        <Button className={styles.button}>{t(texts.general.apply)}</Button>
      </div>
    </div>
  );
};
