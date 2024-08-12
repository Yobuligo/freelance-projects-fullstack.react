import { Card } from "../../../../components/card/Card";
import { CrudButtonPanel } from "../../../../components/crudButtonPanel/CrudButtonPanel";
import { LabeledInput } from "../../../../components/labeledInput/LabeledInput";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { style } from "../../../../utils/style";
import { ITaskItemProps } from "./ITaskItemProps";
import styles from "./TaskItem.module.scss";
import { useTaskItemViewModel } from "./useTaskItemViewModel";

export const TaskItem: React.FC<ITaskItemProps> = (props) => {
  const viewModel = useTaskItemViewModel(props);
  const { t } = useTranslation();

  const inputClassNames = style(
    styles.input,
    viewModel.displayMode === true ? styles.inputDisabled : ""
  );

  return (
    <Card className={styles.taskItem}>
      <div className={styles.inputs}>
        <LabeledInput
          classNameInput={inputClassNames}
          label={t(texts.taskItem.taskTitle)}
          onChange={viewModel.onChangeTitle}
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
        <div className={styles.separator}></div>
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
