import { Spinner } from "../../../../components/spinner/Spinner";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { ProjectAdd } from "../projectAdd/ProjectAdd";
import { ProjectDetails } from "../projectDetails/ProjectDetails";
import { ProjectList } from "../projectList/ProjectList";
import { IProjectSectionProps } from "./IProjectSectionProps";
import styles from "./ProjectSection.module.scss";
import { useProjectSectionViewModel } from "./useProjectSectionViewModel";

export const ProjectSection: React.FC<IProjectSectionProps> = (props) => {
  const { t } = useTranslation();
  const viewModel = useProjectSectionViewModel();

  return (
    <div className={styles.projectSection}>
      {viewModel.selectedProject ? (
        <ProjectDetails
          project={viewModel.selectedProject}
          onBack={viewModel.onProjectUnselected}
          onDeleteTask={viewModel.onDeleteTask}
        />
      ) : (
        <>
          <ProjectAdd
            isAdding={viewModel.addProjectRequest.isProcessing}
            onAdd={viewModel.onAdd}
          />
          {viewModel.loadProjectRequest.isProcessing ? (
            <Spinner />
          ) : (
            <>
              {viewModel.findRecentlyUsedProjects().length > 0 && (
                <div className={styles.projectList}>
                  {t(texts.projectSection.recentlyUsedProjects)}
                  <ProjectList
                    onChange={viewModel.onChange}
                    onClick={viewModel.onProjectSelected}
                    onDelete={viewModel.onDelete}
                    onStart={viewModel.onStart}
                    onStop={viewModel.onStop}
                    projects={viewModel.findRecentlyUsedProjects()}
                  />
                </div>
              )}
              <div className={styles.projectList}>
                {t(texts.projectSection.all)}
                <ProjectList
                  onChange={viewModel.onChange}
                  onClick={viewModel.onProjectSelected}
                  onDelete={viewModel.onDelete}
                  onStart={viewModel.onStart}
                  onStop={viewModel.onStop}
                  projects={viewModel.projects}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
