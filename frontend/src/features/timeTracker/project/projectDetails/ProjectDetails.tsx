import { ArrowBackIcon } from "../../../../icons/ArrowBackIcon";
import { ITask } from "../../../../shared/model/ITask";
import { TaskSection } from "../../task/taskSection/TaskSection";
import { IProjectDetailsProps } from "./IProjectDetailsProps";
import styles from "./ProjectDetails.module.scss";
import componentStyles from "../../../../styles/components.module.scss";
import { style } from "../../../../utils/style";

export const ProjectDetails: React.FC<IProjectDetailsProps> = (props) => {
  const onDeleteTask = (task: ITask) =>
    props.onDeleteTask?.(props.project, task);

  const onChangeTask = (task: ITask) =>
    props.onChangeTask?.(props.project, task);

  return (
    <div className={styles.projectDetails}>
      <button className={style(componentStyles.clickableIcon, styles.button)}>
        <ArrowBackIcon onClick={props.onBack} />
      </button>
      <TaskSection
        onChange={onChangeTask}
        onDelete={onDeleteTask}
        tasks={props.project.tasks}
      />
    </div>
  );
};
