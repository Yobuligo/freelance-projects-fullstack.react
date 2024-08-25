import { useState } from "react";
import { Button } from "../../../../components/button/Button";
import { Toolbar } from "../../../../components/toolbar/Toolbar";
import { ArrowBackIcon } from "../../../../icons/ArrowBackIcon";
import { SettingsIcon } from "../../../../icons/SettingsIcon";
import { ITask } from "../../../../shared/model/ITask";
import componentStyles from "../../../../styles/components.module.scss";
import { style } from "../../../../utils/style";
import { TaskSection } from "../../task/taskSection/TaskSection";
import { ProjectSettings } from "../projectSettings/ProjectSettings";
import { IProjectDetailsProps } from "./IProjectDetailsProps";
import styles from "./ProjectDetails.module.scss";
import { useToggle } from "../../../../hooks/useToggle";

export const ProjectDetails: React.FC<IProjectDetailsProps> = (props) => {
  const [displaySettings, toggleDisplaySettings] = useToggle(false);
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
      <Toolbar
        rightChildren={
          <Button onClick={toggleDisplaySettings}>
            <SettingsIcon className={styles.icon} />
          </Button>
        }
      >
        <h3 className={styles.title}>{props.project.title}</h3>
      </Toolbar>
      {displaySettings && (
        <ProjectSettings
          project={props.project}
          onDelete={onDelete}
          onChange={props.onChangeProject}
        />
      )}
      <TaskSection
        onChange={onChangeTask}
        onDelete={onDeleteTask}
        tasks={props.project.tasks}
      />
    </div>
  );
};
