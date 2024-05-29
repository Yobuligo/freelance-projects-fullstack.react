import { useEffect, useState } from "react";
import { ProjectApi } from "../../api/ProjectApi";
import { IProject } from "../../shared/model/IProject";
import { request } from "../../utils/request";
import { CompletedSection } from "../completedSection/CompletedSection";
import { ProjectList } from "../projectList/ProjectList";
import { IProjectSectionProps } from "./IProjectSectionProps";
import styles from "./ProjectSection.module.scss";

export const ProjectSection: React.FC<IProjectSectionProps> = (props) => {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    request(async () => {
      const projects = await ProjectApi.findAll();
      setProjects(projects);
    });
  }, []);

  const openProjects = projects.filter((project) => !project.completed);

  const completedProjects = projects.filter((project) => project.completed);

  const onProjectChecked = (project: IProject) =>
    setProjects((previous) => {
      project.completed = true;
      return [...previous];
    });

  const onProjectUnchecked = (project: IProject) =>
    setProjects((previous) => {
      project.completed = false;
      return [...previous];
    });

  return (
    <div className={styles.projectSection}>
      <ProjectList
        onChecked={onProjectChecked}
        onUnchecked={onProjectUnchecked}
        projects={openProjects}
      />
      <div className={styles.completedSection}>
        <CompletedSection
          onChecked={onProjectChecked}
          onUnchecked={onProjectUnchecked}
          projects={completedProjects}
        />
      </div>
    </div>
  );
};
