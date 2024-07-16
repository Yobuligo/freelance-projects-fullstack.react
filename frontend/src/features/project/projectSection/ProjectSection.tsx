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

  useInitialize(viewModel.loadProjects);

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
            viewModel.needsDisplaySelectedProject ? styles.listsSection : ""
          }
        >
          <div>
            <ProjectList
              isLoading={viewModel.isLoading}
              onChange={viewModel.onProjectChanged}
              onChecked={viewModel.onProjectChecked}
              onSelectProject={viewModel.onSelectProject}
              onUnchecked={viewModel.onProjectUnchecked}
              projects={viewModel.openProjects}
              selectedProject={viewModel.selectedProject}
            />
            <div className={styles.projectSubSection}>
              <ProjectSubList
                collapsed={viewModel.appliedProjectsCollapsed}
                onChange={viewModel.onProjectChanged}
                onChecked={viewModel.onProjectChecked}
                onSelectProject={viewModel.onSelectProject}
                onUnchecked={viewModel.onProjectUnchecked}
                projects={viewModel.appliedProjects}
                selectedProject={viewModel.selectedProject}
                setCollapsed={viewModel.onSetAppliedProjectsCollapsed}
                title={t(texts.appliedCard.applied, {
                  numberProjects: viewModel.appliedProjects.length.toString(),
                })}
                listAndItemColorClassName={styles.itemApplied}
              />
            </div>
            <div className={styles.projectSubSection}>
              <ProjectSubList
                collapsed={viewModel.trashProjectsCollapsed}
                onChange={viewModel.onProjectChanged}
                onChecked={viewModel.onProjectChecked}
                onSelectProject={viewModel.onSelectProject}
                onUnchecked={viewModel.onProjectUnchecked}
                projects={viewModel.trashProjects}
                selectedProject={viewModel.selectedProject}
                setCollapsed={viewModel.onSetTrashProjectsCollapsed}
                title={t(texts.trashCard.trash, {
                  numberProjects: viewModel.trashProjects.length.toString(),
                })}
                listAndItemColorClassName={styles.itemTrash}
              />
            </div>
          </div>

          {viewModel.needsDisplaySelectedProject &&
            viewModel.selectedProject && (
              <Card className={styles.readingSection}>
                <ProjectIFrame
                  project={viewModel.selectedProject}
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
