import { ProjectAdd } from "../projectAdd/ProjectAdd";
import { ProjectDetails } from "../projectDetails/ProjectDetails";
import { ProjectList } from "../projectList/ProjectList";
import { IProjectSectionProps } from "./IProjectSectionProps";
import styles from "./ProjectSection.module.scss";
import { useProjectSectionViewModel } from "./useProjectSectionViewModel";

export const ProjectSection: React.FC<IProjectSectionProps> = (props) => {
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
          <ProjectAdd onAdd={viewModel.onAdd} />
          <ProjectList
            onClick={viewModel.onProjectSelected}
            onDelete={viewModel.onDelete}
            onStart={viewModel.onStart}
            onStop={viewModel.onStop}
            projects={viewModel.projects}
          />
        </>
      )}
    </div>
  );
};
