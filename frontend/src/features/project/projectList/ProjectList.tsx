import { Spinner } from "../../../components/spinner/Spinner";
import { SpinnerSize } from "../../../components/spinner/SpinnerSize";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { ProjectItem } from "../projectItem/ProjectItem";
import styles from "./ProjectList.module.scss";
import { IProjectListProps } from "./ProjectListProps";

export const ProjectList: React.FC<IProjectListProps> = (props) => {
  const { t } = useTranslation();

  const items = props.projects.map((project) => (
    <ProjectItem
      key={project.id}
      onChecked={props.onChecked}
      onUnchecked={props.onUnchecked}
      project={project}
    />
  ));

  return (
    <div className={styles.projectList}>
      {props.isLoading ? (
        <div className={styles.message}>
          <Spinner color="black" size={SpinnerSize.MEDIUM} />
        </div>
      ) : (
        <>
          {items.length === 0 ? (
            <div className={styles.message}>
              <h3>{t(texts.projectList.noProjects)}</h3>
            </div>
          ) : (
            items
          )}
        </>
      )}
    </div>
  );
};