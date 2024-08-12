import { useState } from "react";
import { DateTime } from "../../../../core/services/date/DateTime";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { ITaskItemProps } from "./ITaskItemProps";

export const useTaskItemViewModel = (props: ITaskItemProps) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(props.task.title);
  const [startedAtDate, setStartedAtDate] = useState(
    DateTime.format(props.task.startedAt, "yyyy-MM-dd")
  );
  const [startedAtTime, setStartedAtTime] = useState(
    DateTime.format(props.task.startedAt, "hh:mm:ss")
  );
  const [stoppedAtDate, setStoppedAtDate] = useState(
    props.task.stoppedAt && DateTime.format(props.task.stoppedAt, "yyyy-MM-dd")
  );
  const [stoppedAtTime, setStoppedAtTime] = useState(
    props.task.stoppedAt && DateTime.format(props.task.stoppedAt, "hh:mm:ss")
  );
  const [displayMode, setDisplayMode] = useState(true);

  const onCancel = () => {
    setDisplayMode(true);
    setTitle(props.task.title);
    setStartedAtDate(DateTime.format(props.task.startedAt, "yyyy-MM-dd"));
    setStartedAtTime(DateTime.format(props.task.startedAt, "hh:mm:ss"));
    setStoppedAtDate(
      props.task.stoppedAt
        ? DateTime.format(props.task.stoppedAt, "yyyy-MM-dd")
        : ""
    );
    setStoppedAtTime(
      props.task.stoppedAt
        ? DateTime.format(props.task.stoppedAt, "hh:mm:ss")
        : ""
    );
  };

  const onConfirm = () => {
    setDisplayMode(true);

    // update project and throw change event
    props.task.title = title;
    props.task.startedAt = DateTime.create(startedAtDate, startedAtTime);
    if (stoppedAtDate && stoppedAtTime) {
      props.task.stoppedAt = DateTime.create(stoppedAtDate, stoppedAtTime);
    }
    props.onChange?.(props.task);
  };

  const onDelete = () => {
    if (
      window.confirm(
        t(texts.taskItem.deleteQuestion, { title: props.task.title })
      )
    ) {
      props.onDelete?.(props.task);
    }
  };

  const onEditMode = () => setDisplayMode(false);

  const onChangeStartedAtDate = (date: string) => setStartedAtDate(date);

  const onChangeStartedAtTime = (time: string) => setStartedAtTime(time);

  const onChangeStoppedAtDate = (date: string) => setStoppedAtDate(date);

  const onChangeStoppedAtTime = (time: string) => setStoppedAtTime(time);

  const onChangeTitle = (title: string) => setTitle(title);

  return {
    displayMode,
    onCancel,
    onChangeStartedAtDate,
    onChangeStartedAtTime,
    onChangeStoppedAtDate,
    onChangeStoppedAtTime,
    onChangeTitle,
    onConfirm,
    onDelete,
    onEditMode,
    startedAtDate,
    stoppedAtDate,
    startedAtTime,
    stoppedAtTime,
    title,
  };
};
