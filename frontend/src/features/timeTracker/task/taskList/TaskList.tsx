import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { TaskItem } from "../taskItem/TaskItem";
import { ITaskListProps } from "./ITaskListProps";
import styles from "./TaskList.module.scss";
import { useTaskListViewModel } from "./useTaskListVIewModel";

export const TaskList: React.FC<ITaskListProps> = (props) => {
  const viewModel = useTaskListViewModel(props);
  const { t } = useTranslation();

  const items = viewModel.tasks.map((task) => (
    <TaskItem
      key={task.id}
      onChange={props.onChange}
      onDelete={props.onDelete}
      task={task}
    />
  ));

  return (
    <div className={styles.taskList}>
      {items.length > 0 ? <>{items}</> : <>{t(texts.taskList.noTasks)}</>}
    </div>
  );
};
