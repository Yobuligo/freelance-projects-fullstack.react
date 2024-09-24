import { AddInput } from "../../../../components/addInput/AddInput";
import { Spinner } from "../../../../components/spinner/Spinner";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { TimeTrackerSettings } from "../../timeTrackerSettings/TimeTrackerSettings";
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
          displaySettings={props.displaySettings}
          project={viewModel.selectedProject}
          onBack={viewModel.onProjectUnselected}
          onChangeTask={viewModel.onChangeTask}
          onDeleteTask={viewModel.onDeleteTask}
          onDeleteProject={viewModel.onDeleteProject}
          onChangeProject={viewModel.onChange}
        />
      ) : (
        <>
          {props.displaySettings && <TimeTrackerSettings />}
          <AddInput
            buttonCaption={t(texts.projectAdd.addProject)}
            label={t(texts.general.title)}
            isAdding={viewModel.addProjectRequest.isProcessing}
            onAdd={viewModel.onAdd}
            classNameLabelInput={styles.title}
          />
          {viewModel.loadProjectRequest.isProcessing ? (
            <Spinner />
          ) : (
            <>
              {viewModel.findRecentlyUsedProjects().length > 0 && (
                <div className={styles.projectList}>
                  <h4 className={styles.title}>
                    {t(texts.projectSection.recentlyUsedProjects)}
                  </h4>
                  <ProjectList
                    onClick={viewModel.onProjectSelected}
                    onStart={viewModel.onStart}
                    onStop={viewModel.onStop}
                    projects={viewModel.findRecentlyUsedProjects()}
                  />
                </div>
              )}
              <div className={styles.projectList}>
                <h4 className={styles.title}>{t(texts.projectSection.all)}</h4>
                <ProjectList
                  onClick={viewModel.onProjectSelected}
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
