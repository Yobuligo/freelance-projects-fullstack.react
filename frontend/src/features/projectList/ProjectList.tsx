import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { CompletedCard } from "../completedCard/CompletedCard";
import { Project } from "../project/Project";
import styles from "./ProjectList.module.scss";
import { IProjectListProps } from "./ProjectListProps";

export const ProjectList: React.FC<IProjectListProps> = (props) => {
  const { t } = useTranslation();

  const items = props.projects.map((project) => (
    <Project
      key={project.id}
      checked={false}
      onChecked={() => {}}
      project={project}
    />
  ));

  return (
    <div className={styles.projectList}>
      {items.length === 0 ? <>{t(texts.projectList.noProjects)}</> : items}
      <CompletedCard />
    </div>
  );
};
