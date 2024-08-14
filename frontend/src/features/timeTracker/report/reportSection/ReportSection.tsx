import { useMemo } from "react";
import { LabeledInput } from "../../../../components/labeledInput/LabeledInput";
import { ToggleButtonGroup } from "../../../../components/toggleButtonGroup/ToggleButtonGroup";
import { Toolbar } from "../../../../components/toolbar/Toolbar";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { IReportSectionProps } from "./IReportSectionProps";
import styles from "./ReportSection.module.scss";

export const ReportSection: React.FC<IReportSectionProps> = (props) => {
  const { t } = useTranslation();
  const toggleButtonGroupItems = useMemo(
    () => [
      { key: 0, title: t(texts.general.day) },
      { key: 1, title: t(texts.general.week) },
      { key: 2, title: t(texts.general.month) },
      { key: 3, title: t(texts.general.year) },
    ],
    [t]
  );

  return (
    <div className={styles.reportSection}>
      <div>
        <Toolbar>
          <ToggleButtonGroup
            items={toggleButtonGroupItems}
            selected={toggleButtonGroupItems[0]}
          />
        </Toolbar>
        <Toolbar>
          <LabeledInput label="from" type="date" />
          <LabeledInput label="to" type="date" />
        </Toolbar>
      </div>
    </div>
  );
};
