import { LabeledInput } from "../../../../components/labeledInput/LabeledInput";
import { ToggleButtonGroup } from "../../../../components/toggleButtonGroup/ToggleButtonGroup";
import { Toolbar } from "../../../../components/toolbar/Toolbar";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { IReportSectionProps } from "./IReportSectionProps";
import styles from "./ReportSection.module.scss";
import { useReportSectionViewModel } from "./useReportSectionViewModel";

export const ReportSection: React.FC<IReportSectionProps> = (props) => {
  const { t } = useTranslation();
  const viewModel = useReportSectionViewModel();

  return (
    <div className={styles.reportSection}>
      <Toolbar>
        <ToggleButtonGroup
          disabled={viewModel.isToggleButtonGroupDisabled}
          items={viewModel.toggleButtonGroupItems}
          selected={viewModel.toggleButtonGroupItems[0]}
        />
      </Toolbar>
      <div className={styles.inputGroup}>
        <LabeledInput
          label={t(texts.general.from)}
          onChange={viewModel.onChangeFromDate}
          type="date"
          value={viewModel.fromDate}
        />
        <LabeledInput
          label={t(texts.general.to)}
          onChange={viewModel.onChangeToDate}
          type="date"
          value={viewModel.toDate}
        />
      </div>
    </div>
  );
};
