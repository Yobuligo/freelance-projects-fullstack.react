import { TaskItem } from "../taskItem/TaskItem";
import { ITaskListProps } from "./ITaskListProps";
import styles from "./TaskList.module.scss";
import { useTaskListViewModel } from "./useTaskListVIewModel";

export const TaskList: React.FC<ITaskListProps> = (props) => {
  const viewModel = useTaskListViewModel(props);

  const items = viewModel.tasks.map((task) => (
    <TaskItem key={task.id} onDelete={props.onDelete} task={task} />
  ));

  return <div className={styles.taskList}>{items}</div>;
};
