import { ReactComponent as CheckIcon } from "../../../assets/check.svg";
import { ReactComponent as ReloadIcon } from "../../../assets/reload.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/settings.svg";
import { Button } from "../../../components/button/Button";
import { useInitialize } from "../../../hooks/useInitialize";
import { CompletedSection } from "../../completedSection/CompletedSection";
import { SettingsSection } from "../../settings/SettingsSection";
import { ProjectList } from "../projectList/ProjectList";
import styles from "./ProjectSection.module.scss";
import { useProjectSectionViewModel } from "./useProjectSectionViewModel";

export const ProjectSection: React.FC = () => {
  const viewModel = useProjectSectionViewModel();

  useInitialize(viewModel.loadProjects);

  return (
    <div className={styles.projectSection}>
      <div className={styles.reloadButton}>
        <div className={styles.leftButtons}>
          <Button onClick={viewModel.onReload}>
            <ReloadIcon />
          </Button>
          <Button onClick={viewModel.onCheckAll}>
            <CheckIcon />
          </Button>
        </div>
        <Button onClick={viewModel.onToggleDisplaySettings}>
          <SettingsIcon />
        </Button>
      </div>

      <>
        {viewModel.displaySettings && (
          <div className={styles.settingsSection}>
            <SettingsSection />
          </div>
        )}
        <ProjectList
          isLoading={viewModel.isLoading}
          onChecked={viewModel.onProjectChecked}
          onUnchecked={viewModel.onProjectUnchecked}
          projects={viewModel.openProjects}
        />
        <div className={styles.completedSection}>
          <CompletedSection
            onChecked={viewModel.onProjectChecked}
            onUnchecked={viewModel.onProjectUnchecked}
            projects={viewModel.completedProjects}
          />
        </div>
      </>
    </div>
  );
};
