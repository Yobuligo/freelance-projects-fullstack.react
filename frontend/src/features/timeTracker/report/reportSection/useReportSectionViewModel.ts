import { useMemo, useState } from "react";
import { isNotInitial } from "../../../../core/utils/isNotInitial";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";

export const useReportSectionViewModel = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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

  const isToggleButtonGroupDisabled =
    isNotInitial(fromDate) || isNotInitial(toDate);

  const onDeleteDate = () => {
    setFromDate("");
    setToDate("");
  };

  const onChangeFromDate = (newDate: string) => setFromDate(newDate);

  const onChangeToDate = (newDate: string) => setToDate(newDate);

  return {
    fromDate,
    isToggleButtonGroupDisabled,
    onChangeFromDate,
    onChangeToDate,
    onDeleteDate,
    toDate,
    toggleButtonGroupItems,
  };
};
