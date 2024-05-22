import { useEffect, useState } from "react";
import { ProjectApi } from "./api/ProjectApi";
import { IProject } from "./shared/model/IProject";
import { request } from "./utils/request";

export const App: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    request(async () => {
      const projects = await ProjectApi.findAll();
      setProjects(projects);
    });
  }, []);

  const items = projects.map((project) => <div>{project.title}</div>);

  return <>{items}</>;
};
