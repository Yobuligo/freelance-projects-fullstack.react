import { style } from "../../../../core/ui/style";
import { ArrowBackIcon } from "../../../../icons/ArrowBackIcon";
import { ITask } from "../../../../shared/model/ITask";
import componentStyles from "../../../../styles/components.module.scss";
import { TaskSection } from "../../task/taskSection/TaskSection";
import { ProjectSettings } from "../projectSettings/ProjectSettings";
import { IProjectDetailsProps } from "./IProjectDetailsProps";
import styles from "./ProjectDetails.module.scss";

export const ProjectDetails: React.FC<IProjectDetailsProps> = (props) => {
  const onDeleteTask = (task: ITask) =>
    props.onDeleteTask?.(props.project, task);

  const onChangeTask = (task: ITask) =>
    props.onChangeTask?.(props.project, task);

  const onDelete = () => {
    props.onDeleteProject?.(props.project);
    props.onBack?.();
  };

  return (
    <div className={styles.projectDetails}>
      <button className={style(styles.button)} onClick={props.onBack}>
        <ArrowBackIcon className={componentStyles.iconClickable} />
      </button>
      {props.displaySettings && (
        <ProjectSettings
          project={props.project}
          onDelete={onDelete}
          onChange={props.onChangeProject}
        />
      )}
      <h3 className={styles.title}>{props.project.title}</h3>
      <TaskSection
        onChange={onChangeTask}
        onDelete={onDeleteTask}
        tasks={props.project.tasks}
      />
    </div>
  );
};
