import { ReactComponent as CheckAllIcon } from "../../../assets/check-all.svg";
import { ReactComponent as CheckOldIcon } from "../../../assets/check-old.svg";
import { ReactComponent as ReloadIcon } from "../../../assets/reload.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/settings.svg";
import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/card/Card";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { useInitialize } from "../../../hooks/useInitialize";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { Settings } from "../../settings/settings/Settings";
import { ProjectIFrame } from "../projectIFrame/ProjectIFrame";
import { ProjectList } from "../projectList/ProjectList";
import { ProjectSubList } from "../projectSubList/ProjectSubList";
import styles from "./ProjectSection.module.scss";
import { useProjectSectionViewModel } from "./useProjectSectionViewModel";

/**
 * This component is responsible for creating a project section
 */
export const ProjectSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useProjectSectionViewModel();

  useInitialize(viewModel.loadUserProjects);

  return (
    <div className={styles.projectSection}>
      <Toolbar
        rightChildren={
          <Button onClick={viewModel.onToggleDisplaySettings}>
            <SettingsIcon className={styles.icon} />
          </Button>
        }
      >
        <Button onClick={viewModel.onReload}>
          <ReloadIcon className={styles.icon} />
        </Button>
        <Button onClick={viewModel.onCheckAll}>
          <CheckAllIcon className={styles.icon} />
        </Button>
        <Button onClick={viewModel.onCheckOld}>
          <CheckOldIcon className={styles.icon} />
          {t(texts.projectSection.tickOld)}
        </Button>
      </Toolbar>

      <>
        {viewModel.displaySettings && (
          <div className={styles.settingsSection}>
            <Settings />
          </div>
        )}
        <div
          className={
            viewModel.needsDisplaySelectedUserProject ? styles.listsSection : ""
          }
        >
          <div>
            <ProjectList
              isLoading={viewModel.isLoading}
              onChange={viewModel.onUserProjectChanged}
              onChecked={viewModel.onUserProjectChecked}
              onSelectUserProject={viewModel.onSelectUserProject}
              onUnchecked={viewModel.onUserProjectUnchecked}
              userProjects={viewModel.openUserProjects}
              selectedUserProject={viewModel.selectedUserProject}
            />
            <div className={styles.projectSubSection}>
              <ProjectSubList
                collapsed={viewModel.appliedUserProjectsCollapsed}
                onChange={viewModel.onUserProjectChanged}
                onChecked={viewModel.onUserProjectChecked}
                onSelectUserProject={viewModel.onSelectUserProject}
                onUnchecked={viewModel.onUserProjectUnchecked}
                userProjects={viewModel.appliedUserProjects}
                selectedUserProject={viewModel.selectedUserProject}
                setCollapsed={viewModel.onSetAppliedUserProjectsCollapsed}
                title={t(texts.appliedCard.applied, {
                  numberProjects:
                    viewModel.appliedUserProjects.length.toString(),
                })}
                listAndItemColorClassName={styles.itemApplied}
              />
            </div>
            <div className={styles.projectSubSection}>
              <ProjectSubList
                collapsed={viewModel.trashUserProjectsCollapsed}
                onChange={viewModel.onUserProjectChanged}
                onChecked={viewModel.onUserProjectChecked}
                onSelectUserProject={viewModel.onSelectUserProject}
                onUnchecked={viewModel.onUserProjectUnchecked}
                userProjects={viewModel.trashUserProjects}
                selectedUserProject={viewModel.selectedUserProject}
                setCollapsed={viewModel.onSetTrashUserProjectsCollapsed}
                title={t(texts.trashCard.trash, {
                  numberProjects: viewModel.trashUserProjects.length.toString(),
                })}
                listAndItemColorClassName={styles.itemTrash}
              />
            </div>
          </div>

          {viewModel.needsDisplaySelectedUserProject &&
            viewModel.selectedUserProject && (
              <Card className={styles.readingSection}>
                <ProjectIFrame
                  userProject={viewModel.selectedUserProject}
                  height="100%"
                  width="100%"
                />
              </Card>
            )}
        </div>
      </>
    </div>
  );
};
