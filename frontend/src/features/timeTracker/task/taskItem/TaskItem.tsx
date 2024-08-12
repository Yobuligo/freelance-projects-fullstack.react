import { useState } from "react";
import { Card } from "../../../../components/card/Card";
import { CrudButtonPanel } from "../../../../components/crudButtonPanel/CrudButtonPanel";
import { LabeledInput } from "../../../../components/labeledInput/LabeledInput";
import { DateTime } from "../../../../core/services/date/DateTime";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { style } from "../../../../utils/style";
import { ITaskItemProps } from "./ITaskItemProps";
import styles from "./TaskItem.module.scss";

export const TaskItem: React.FC<ITaskItemProps> = (props) => {
  const { t } = useTranslation();
  const [displayMode, setDisplayMode] = useState(true);

  const onDelete = () => {
    if (
      window.confirm(
        t(texts.taskItem.deleteQuestion, { title: props.task.title })
      )
    ) {
      props.onDelete?.(props.task);
    }
  };

  const inputClassNames = style(
    styles.input,
    displayMode === true ? styles.inputDisabled : ""
  );

  const onCancel = () => {
    setDisplayMode(true);
  };

  const onConfirm = () => {
    setDisplayMode(true);
  };

  const onEditMode = () => setDisplayMode(false);

  return (
    <Card className={styles.taskItem}>
      <div className={styles.inputs}>
        <LabeledInput
          classNameInput={inputClassNames}
          label="Task Title"
          value={props.task.title}
        />
        <LabeledInput
          classNameInput={inputClassNames}
          label="Date"
          type="date"
          value={DateTime.format(props.task.startedAt, "yyyy-MM-dd")}
        />
        <LabeledInput
          classNameInput={inputClassNames}
          label="Started at"
          type="time"
          value={DateTime.format(props.task.startedAt, "hh:mm:ss")}
        />
        <LabeledInput
          classNameInput={inputClassNames}
          label="Stopped at"
          type="time"
          value={
            props.task.stoppedAt &&
            DateTime.format(props.task.stoppedAt, "hh:mm:ss")
          }
        />
      </div>
      <div className={styles.buttonContainer}>
        <CrudButtonPanel
          className={styles.crudButtonPanel}
          displayMode={displayMode}
          onCancel={onCancel}
          onConfirm={onConfirm}
          onDelete={onDelete}
          onEditMode={onEditMode}
        />
      </div>
    </Card>
  );
};
