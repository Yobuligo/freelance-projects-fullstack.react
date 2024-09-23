import { useCallback, useEffect, useState } from "react";
import { Card } from "../../../../components/card/Card";
import { CrudButtonPanel } from "../../../../components/crudButtonPanel/CrudButtonPanel";
import { DurationDisplay } from "../../../../components/duration/DurationDisplay";
import { LabeledInput } from "../../../../components/labeledInput/LabeledInput";
import { style } from "../../../../core/ui/style";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { TaskInfo } from "../../../../shared/services/TaskInfo";
import { ITaskItemProps } from "./ITaskItemProps";
import styles from "./TaskItem.module.scss";
import { useTaskItemViewModel } from "./useTaskItemViewModel";

export const TaskItem: React.FC<ITaskItemProps> = (props) => {
  const [duration, setDuration] = useState(TaskInfo.toDuration(props.task));
  const viewModel = useTaskItemViewModel(props);
  const { t } = useTranslation();

  const inputClassNames = style(
    styles.input,
    viewModel.displayMode === true ? styles.inputDisabled : ""
  );

  const startTimer = useCallback(() => {
    setTimeout(() => {
      setDuration(TaskInfo.toDuration(props.task));
      if (TaskInfo.isRunning(props.task)) {
        startTimer();
      }
    }, 1000);
  }, [props.task]);

  useEffect(() => {
    if (TaskInfo.isRunning(props.task)) {
      startTimer();
    }
  }, [props.task, startTimer]);

  return (
    <Card className={styles.taskItem}>
      <div className={styles.inputs}>
        <LabeledInput
          classNameInput={inputClassNames}
          label={t(texts.taskItem.taskTitle)}
          onChange={viewModel.onChangeTitle}
          onEnter={viewModel.onConfirm}
          onEscape={viewModel.onCancel}
          value={viewModel.title}
        />
        <LabeledInput
          classNameInput={inputClassNames}
          label={t(texts.taskItem.startedAtDate)}
          onChange={viewModel.onChangeStartedAtDate}
          type="date"
          value={viewModel.startedAtDate}
        />
        <LabeledInput
          classNameInput={inputClassNames}
          label={t(texts.taskItem.startedAtTime)}
          onChange={viewModel.onChangeStartedAtTime}
          type="time"
          value={viewModel.startedAtTime}
        />
        <div className={styles.timeSeparator}></div>
        <LabeledInput
          classNameInput={inputClassNames}
          label={t(texts.taskItem.stoppedAtDate)}
          onChange={viewModel.onChangeStoppedAtDate}
          type="date"
          value={viewModel.stoppedAtDate}
        />
        <LabeledInput
          classNameInput={inputClassNames}
          label={t(texts.taskItem.stoppedAtTime)}
          onChange={viewModel.onChangeStoppedAtTime}
          type="time"
          value={viewModel.stoppedAtTime}
        />
        <div className={styles.separator}></div>
        <DurationDisplay
          classNameTitle={styles.durationTitle}
          classNameDuration={styles.duration}
          duration={duration}
          title={t(texts.taskItem.spentTime)}
        />
      </div>
      <div className={styles.buttonContainer}>
        <CrudButtonPanel
          className={styles.crudButtonPanel}
          displayMode={viewModel.displayMode}
          onCancel={viewModel.onCancel}
          onConfirm={viewModel.onConfirm}
          onDelete={viewModel.onDelete}
          onEditMode={viewModel.onEditMode}
        />
      </div>
    </Card>
  );
};
