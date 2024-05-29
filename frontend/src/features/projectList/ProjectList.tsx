import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { Project } from "../project/Project";
import styles from "./ProjectList.module.scss";
import { IProjectListProps } from "./ProjectListProps";

export const ProjectList: React.FC<IProjectListProps> = (props) => {
  const { t } = useTranslation();

  const items = props.projects.map((project) => (
    <Project
      key={project.id}
      onChecked={props.onChecked}
      onUnchecked={props.onUnchecked}
      project={project}
    />
  ));

  return (
    <div className={styles.projectList}>
      {items.length === 0 ? <>{t(texts.projectList.noProjects)}</> : items}
    </div>
  );
};
