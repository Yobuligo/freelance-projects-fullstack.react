import { useState } from "react";
import { ProjectApi } from "../../api/ProjectApi";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { Button } from "../../components/button/Button";
import { Card } from "../../components/card/Card";
import { useInitialize } from "../../hooks/useInitialize";
import { useProjectIdStorage } from "../../hooks/useProjectIdStorage";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { IProject } from "../../shared/model/IProject";
import { CompletedSection } from "../completedSection/CompletedSection";
import { ProjectList } from "../projectList/ProjectList";
import { IProjectSectionProps } from "./IProjectSectionProps";
import styles from "./ProjectSection.module.scss";

export const ProjectSection: React.FC<IProjectSectionProps> = (props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const projectIdStorage = useProjectIdStorage();

  const loadProjects = async () => {
    setIsLoading(true);
    const projects = await ProjectApi.findAll();
    projects.forEach((project) => {
      const index = projectIdStorage.checkedProjectIds.findIndex(
        (projectId) => projectId === project.id
      );
      if (index !== -1) {
        project.completed = true;
      }
    });

    setProjects(projects);
    setIsLoading(false);
  };

  useInitialize(loadProjects);

  const openProjects = projects.filter((project) => !project.completed);

  const completedProjects = projects.filter((project) => project.completed);

  const onProjectChecked = (project: IProject) => {
    setProjects((previous) => {
      project.completed = true;
      return [...previous];
    });
    projectIdStorage.setChecked(project);
  };

  const onProjectUnchecked = (project: IProject) => {
    setProjects((previous) => {
      project.completed = false;
      return [...previous];
    });
    projectIdStorage.setUnchecked(project);
  };

  const onReload = () => loadProjects();

  return (
    <div className={styles.projectSection}>
      <div className={styles.reloadButton}>
        <Button
          caption={t(texts.projectSection.captionReloadButton)}
          onClick={onReload}
        />
        <Card>
          <SettingsIcon />
        </Card>
      </div>

      <>
        <ProjectList
          isLoading={isLoading}
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
      </>
    </div>
  );
};
