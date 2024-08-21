import { useCallback, useEffect, useState } from "react";
import { Duration } from "../../../../core/services/date/Duration";
import { ProjectInfo } from "../../../../shared/services/ProjectInfo";
import { TaskInfo } from "../../../../shared/services/TaskInfo";
import { IProjectItemProps } from "./IProjectItemProps";

export const useProjectItemViewModel = (props: IProjectItemProps) => {
  const [duration, setDuration] = useState<Duration | undefined>(undefined);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  const onClick = () => {
    props.onClick?.(props.project);
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

  return {
    duration,
    durationTotal,
    isRunning,
    onClick,
    onStart,
    onStop,
    projectTitle: props.project.title,
    projectDescription: props.project.description,
  };
};
