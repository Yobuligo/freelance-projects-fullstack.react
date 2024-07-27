import { Spinner } from "../../../components/spinner/Spinner";
import { SpinnerSize } from "../../../components/spinner/SpinnerSize";
import { useSettings } from "../../../hooks/useSettings";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { ProjectItem } from "../projectItem/ProjectItem";
import styles from "./ProjectList.module.scss";
import { IProjectListProps } from "./ProjectListProps";

export const ProjectList: React.FC<IProjectListProps> = (props) => {
  const { t } = useTranslation();
  const [settings] = useSettings();

  console.log(`ProjectList: ${props.listAndItemColorClassName}`);
  const items = props.userProjects.map((userProject) => (
    <ProjectItem
      isSelected={props.selectedUserProject?.id === userProject.id}
      key={userProject.id}
      onChange={props.onChange}
      onSelect={props.onSelectUserProject}
      onChecked={props.onChecked}
      onUnchecked={props.onUnchecked}
      userProject={userProject}
      className={props.listAndItemColorClassName}
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
              {settings.providerRequests.length === 0 ? (
                <>{t(texts.projectList.noProjectsExtended)}</>
              ) : (
                <>{t(texts.projectList.noProjects)}</>
              )}
            </div>
          ) : (
            items
          )}
        </>
      )}
    </div>
  );
};
