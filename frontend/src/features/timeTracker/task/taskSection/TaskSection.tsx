import { TaskList } from "../taskList/TaskList";
import { ITaskSectionProps } from "./ITaskSectionProps";
import styles from "./TaskSection.module.scss";
import { useTaskSectionViewModel } from "./useTaskSectionViewModel";

export const TaskSection: React.FC<ITaskSectionProps> = (props) => {
  const viewModel = useTaskSectionViewModel(props);

  return (
    <div className={styles.taskSection}>
      <TaskList onDelete={props.onDelete} tasks={props.tasks} />
    </div>
  );
};
