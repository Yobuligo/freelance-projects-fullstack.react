import { Button } from "../../../components/button/Button";
import { useInitialize } from "../../../hooks/useInitialize";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { ReactComponent as SettingsIcon } from "../../../assets/settings.svg";
import { CompletedSection } from "../../completedSection/CompletedSection";
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
        <Button>
          <SettingsIcon />
        </Button>
      </div>

      <>
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
