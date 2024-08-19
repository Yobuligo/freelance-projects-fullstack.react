import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { Button } from "../button/Button";
import { LabeledInput } from "../labeledInput/LabeledInput";
import { Toolbar } from "../toolbar/Toolbar";
import styles from "./DateTimeSpanFilter.module.scss";
import { IDateTimeSpanFilterProps } from "./IDateTimeSpanFilterProps";
import { useDateTimeSpanFilterViewModel } from "./useDateTimeSpanFilterViewModel";

export const DateTimeSpanFilter: React.FC<IDateTimeSpanFilterProps> = (
  props
) => {
  const { t } = useTranslation();
  const viewModel = useDateTimeSpanFilterViewModel(props);

  return (
    <div className={styles.dateTimeSpanFilter}>
      <Toolbar className={styles.toolbar}>
        <Button
          onClick={viewModel.onClickYesterday}
          className={styles.button}
          isOutlined
        >
          {t(texts.general.yesterday)}
        </Button>
        <Button
          onClick={viewModel.onClickDay}
          className={styles.button}
          isOutlined
        >
          {t(texts.general.day)}
        </Button>
        <Button
          onClick={viewModel.onClickWeek}
          className={styles.button}
          isOutlined
        >
          {t(texts.general.week)}
        </Button>
        <Button
          onClick={viewModel.onClickMonth}
          className={styles.button}
          isOutlined
        >
          {t(texts.general.month)}
        </Button>
        <Button
          onClick={viewModel.onClickYear}
          isOutlined
          className={styles.button}
        >
          {t(texts.general.year)}
        </Button>
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
        <Button onClick={props.onApply}>{t(texts.general.apply)}</Button>
      </div>
    </div>
  );
};
