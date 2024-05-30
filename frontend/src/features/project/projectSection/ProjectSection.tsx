import { ReactComponent as SettingsIcon } from "../../../assets/settings.svg";
import { Button } from "../../../components/button/Button";
import { useInitialize } from "../../../hooks/useInitialize";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { CompletedSection } from "../../completedSection/CompletedSection";
import { SettingsSection } from "../../settings/settingsSection/SettingsSection";
import { ProjectList } from "../projectList/ProjectList";
import styles from "./ProjectSection.module.scss";
import { useProjectSectionViewModel } from "./useProjectSectionViewModel";

export const ProjectSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useProjectSectionViewModel();

  useInitialize(viewModel.loadProjects);

  return (
    <div className={styles.projectSection}>
      <div className={styles.reloadButton}>
        <Button
          caption={t(texts.projectSection.captionReloadButton)}
          onClick={viewModel.onReload}
        />
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
