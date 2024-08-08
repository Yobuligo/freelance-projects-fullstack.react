import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { ProjectItem } from "../projectItem/ProjectItem";
import { IProjectListProps } from "./IProjectListProps";
import styles from "./ProjectList.module.scss";

export const ProjectList: React.FC<IProjectListProps> = (props) => {
  const { t } = useTranslation();

  const items = props.projects.map((project) => (
    <ProjectItem
      key={project.id}
      onClick={props.onClick}
      onDelete={props.onDelete}
      onStart={props.onStart}
      onStop={props.onStop}
      project={project}
    />
  ));

  return (
    <div className={styles.projectList}>
      {items.length > 0 ? <>{items}</> : <>{t(texts.projectList.noProjects)}</>}
    </div>
  );
};
