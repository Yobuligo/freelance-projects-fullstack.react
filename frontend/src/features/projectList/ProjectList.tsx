import { Project } from "../project/Project";
import styles from "./ProjectList.module.scss";
import { IProjectListProps } from "./ProjectListProps";

export const ProjectList: React.FC<IProjectListProps> = (props) => {
  const items = props.projects.map((project) => (
    <Project key={project.id} project={project} />
  ));
  return <div className={styles.projectList}>{items}</div>;
};
