import { Spinner } from "../../components/spinner/Spinner";
import { SpinnerSize } from "../../components/spinner/SpinnerSize";
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
      {items.length === 0 ? (
        <div className={styles.noProjectsMessage}>
          <h3>{t(texts.projectList.noProjects)}</h3>
          {props.isLoading && <Spinner color="black" size={SpinnerSize.SMALL}/>}
        </div>
      ) : (
        items
      )}
    </div>
  );
};
