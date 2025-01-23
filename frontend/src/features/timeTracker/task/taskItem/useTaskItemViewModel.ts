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
  const [task, setTask] = useState(props.task);

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

  const onChangeStartedAtDate = (date: string) => {
    setStartedAtDate(date);
    setTask((previous) => ({
      ...previous,
      startedAt: DateTime.create(date, startedAtTime),
    }));
  };

  const onChangeStartedAtTime = (time: string) => {
    setStartedAtTime(time);
    setTask((previous) => ({
      ...previous,
      startedAt: DateTime.create(startedAtDate, time),
    }));
  };

  const onChangeStoppedAtDate = (date: string) => {
    setStoppedAtDate(date);
    setTask((previous) => ({
      ...previous,
      stoppedAt: DateTime.create(date, stoppedAtTime ?? "0"),
    }));
  };

  const onChangeStoppedAtTime = (time: string) => {
    setStoppedAtTime(time);
    setTask((previous) => ({
      ...previous,
      stoppedAt: DateTime.create(stoppedAtDate ?? startedAtDate, time),
    }));
  };

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
    task,
    title,
  };
};
