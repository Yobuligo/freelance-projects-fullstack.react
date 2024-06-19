import { ReactComponent as CheckAllIcon } from "../../../assets/check-all.svg";
import { ReactComponent as ReloadIcon } from "../../../assets/reload.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/settings.svg";
import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/card/Card";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { useInitialize } from "../../../hooks/useInitialize";
import { CompletedSection } from "../../completedSection/CompletedSection";
import { SettingsSection } from "../../settings/SettingsSection";
import { ProjectIFrame } from "../projectIFrame/ProjectIFrame";
import { ProjectList } from "../projectList/ProjectList";
import styles from "./ProjectSection.module.scss";
import { useProjectSectionViewModel } from "./useProjectSectionViewModel";

export const ProjectSection: React.FC = () => {
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
      </Toolbar>

      <>
        {viewModel.displaySettings && (
          <div className={styles.settingsSection}>
            <SettingsSection />
          </div>
        )}
        <div
          className={
            viewModel.needsDisplayActiveProject ? styles.listsSection : ""
          }
        >
          <div>
            <ProjectList
              activeProject={viewModel.activeProject}
              isLoading={viewModel.isLoading}
              onActivateProject={viewModel.onActivateProject}
              onChecked={viewModel.onProjectChecked}
              onUnchecked={viewModel.onProjectUnchecked}
              projects={viewModel.openProjects}
            />
            <div className={styles.completedSection}>
              <CompletedSection
                activeProject={viewModel.activeProject}
                onActivateProject={viewModel.onActivateProject}
                onChecked={viewModel.onProjectChecked}
                onUnchecked={viewModel.onProjectUnchecked}
                projects={viewModel.completedProjects}
              />
            </div>
          </div>

          {viewModel.needsDisplayActiveProject && viewModel.activeProject && (
            <Card className={styles.readingSection}>
              <ProjectIFrame
                project={viewModel.activeProject}
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
