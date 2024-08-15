import { useCallback, useEffect, useState } from "react";
import { Duration } from "../../../../core/services/date/Duration";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { ProjectInfo } from "../../../../shared/services/ProjectInfo";
import { TaskInfo } from "../../../../shared/services/TaskInfo";
import { IProjectItemProps } from "./IProjectItemProps";

export const useProjectItemViewModel = (props: IProjectItemProps) => {
  const [displayMode, setDisplayMode] = useState(true);
  const [projectTitle, setProjectTitle] = useState(props.project.title);
  const [duration, setDuration] = useState<Duration | undefined>(undefined);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  const { t } = useTranslation();

  const onDelete = () => {
    if (
      window.confirm(
        t(texts.projectItem.deleteProject, { title: props.project.title })
      )
    ) {
      props.onDelete?.(props.project);
    }
  };

  const onClick = () => {
    if (displayMode) {
      props.onClick?.(props.project);
    }
  };

  const onStop = () => {
    props.onStop?.(props.project);
    stopTimer();
  };

  const onStart = () => props.onStart?.(props.project);

  const isRunning = ProjectInfo.hasRunningTask(props.project);

  const calcDuration = useCallback(() => {
    const task = ProjectInfo.findRunningTask(props.project);
    if (task) {
      setDuration(TaskInfo.toDuration(task));
    } else {
      setDuration(undefined);
    }
  }, [props.project]);

  const startTimer = useCallback(() => {
    const timeoutId = setTimeout(() => {
      calcDuration();
      startTimer();
    }, 1000);
    setTimeoutId(timeoutId);
  }, [calcDuration]);

  const stopTimer = useCallback(() => clearTimeout(timeoutId), [timeoutId]);

  useEffect(() => {
    if (isRunning) {
      calcDuration();
      startTimer();
    } else {
      setDuration(undefined);
    }
  }, [calcDuration, isRunning, startTimer]);

  const durationTotal = ProjectInfo.toDurationTotal(props.project);

  const onCancel = () => {
    setDisplayMode(true);
    setProjectTitle(props.project.title);
  };

  const onConfirm = () => {
    setDisplayMode(true);
    props.project.title = projectTitle;
    props.onChange?.(props.project);
  };

  const onEditMode = () => setDisplayMode(false);

  const onChangeProjectTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setProjectTitle(event.target.value);

  return {
    displayMode,
    duration,
    durationTotal,
    isRunning,
    onCancel,
    onChangeProjectTitle,
    onClick,
    onConfirm,
    onEditMode,
    onDelete,
    onStart,
    onStop,
    projectTitle,
  };
};
