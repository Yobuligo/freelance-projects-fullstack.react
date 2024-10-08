import { useState } from "react";
import { DateTime } from "../../core/services/date/DateTime";
import { IDateTimeSpanFilterProps } from "./IDateTimeSpanFilterProps";

export const useDateTimeSpanFilterViewModel = (
  props: IDateTimeSpanFilterProps
) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const now = new Date();

  const triggerOnChange = (from: Date, to: Date) => props.onChange?.(from, to);

  const onClickDay = () => {
    // set inputs from and to to the current date
    setFromDate(DateTime.toDate(now));
    setToDate(DateTime.toDate(now));
    triggerOnChange(now, now);
  };

  const onClickWeek = () => {
    // set inputs from and to to the current week span dates
    const weekStartDate = DateTime.getWeekStartDate(now);
    const weekEndDate = DateTime.getWeekEndDate(now);
    setFromDate(DateTime.toDate(weekStartDate));
    setToDate(DateTime.toDate(weekEndDate));
    triggerOnChange(weekStartDate, weekEndDate);
  };

  const onClickMonth = () => {
    // set inputs from and to to the current month span dates
    const monthStartDate = DateTime.getMonthStartDate(now);
    const monthEndDate = DateTime.getMonthEndDate(now);
    setFromDate(DateTime.toDate(monthStartDate));
    setToDate(DateTime.toDate(monthEndDate));
    triggerOnChange(monthStartDate, monthEndDate);
  };

  const onClickYear = () => {
    // set inputs from and to to the current month span dates
    const yearStartDate = DateTime.getYearStartDate(now);
    const yearEndDate = DateTime.getYearEndDate(now);
    setFromDate(DateTime.toDate(yearStartDate));
    setToDate(DateTime.toDate(yearEndDate));
    triggerOnChange(yearStartDate, yearEndDate);
  };

  const onClickYesterday = () => {
    // set inputs from and to to yesterday's dates
    const yesterdaysDate = DateTime.subtractDays(now, 1);
    const yesterday = DateTime.toDate(yesterdaysDate);
    setFromDate(yesterday);
    setToDate(yesterday);
    triggerOnChange(yesterdaysDate, yesterdaysDate);
  };

  const onChangeFromDate = (newDate: string) => {
    setFromDate(newDate);
    triggerOnChange(new Date(newDate), new Date(toDate));
  };

  const onChangeToDate = (newDate: string) => {
    setToDate(newDate);
    triggerOnChange(new Date(fromDate), new Date(newDate));
  };

  return {
    fromDate,
    onClickDay,
    onClickMonth,
    onClickWeek,
    onClickYear,
    onClickYesterday,
    onChangeFromDate,
    onChangeToDate,
    toDate,
  };
};
