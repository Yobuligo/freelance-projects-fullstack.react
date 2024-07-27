import { Spinner } from "../../../components/spinner/Spinner";
import { SpinnerSize } from "../../../components/spinner/SpinnerSize";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { useUserProviderRequests } from "../../../hooks/useUserProviderRequests";
import { ProjectItem } from "../projectItem/ProjectItem";
import styles from "./ProjectList.module.scss";
import { IProjectListProps } from "./ProjectListProps";

export const ProjectList: React.FC<IProjectListProps> = (props) => {
  const [userProviderRequests] = useUserProviderRequests();
  const { t } = useTranslation();

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
              {userProviderRequests.length === 0 ? (
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
