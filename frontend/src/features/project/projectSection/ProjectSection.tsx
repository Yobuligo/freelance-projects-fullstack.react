import { ReactComponent as CheckAllIcon } from "../../../assets/check-all.svg";
import { ReactComponent as CheckOldIcon } from "../../../assets/check-old.svg";
import { ReactComponent as ReloadIcon } from "../../../assets/reload.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/settings.svg";
import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/card/Card";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { useInitialize } from "../../../hooks/useInitialize";
import { CompletedSection } from "../../completedSection/CompletedSection";
import { Settings } from "../../settings/settings/Settings";
import { ProjectIFrame } from "../projectIFrame/ProjectIFrame";
import { ProjectList } from "../projectList/ProjectList";
import styles from "./ProjectSection.module.scss";
import { useProjectSectionViewModel } from "./useProjectSectionViewModel";

/**
 * This component is responsible for creating a project section
 */
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
            <div className={styles.completedSection}>
              <CompletedSection
                onChange={viewModel.onProjectChanged}
                onChecked={viewModel.onProjectChecked}
                onSelectProject={viewModel.onSelectProject}
                onUnchecked={viewModel.onProjectUnchecked}
                projects={viewModel.completedProjects}
                selectedProject={viewModel.selectedProject}
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
