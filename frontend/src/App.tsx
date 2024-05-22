import { useEffect, useState } from "react";
import { ProjectApi } from "./api/ProjectApi";
import { IProject } from "./shared/model/IProject";
import { request } from "./utils/request";
import { ProjectList } from "./features/projectList/ProjectList";
import styles from "./App.module.scss";

export const App: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    request(async () => {
      const projects = await ProjectApi.findAll();
      setProjects(projects);
    });
  }, []);

  return (
    <div className={styles.app}>
      <ProjectList projects={projects} />
    </div>
  );
};
