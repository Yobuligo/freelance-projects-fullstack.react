import { useCallback, useEffect, useState } from "react";
import { ProjectApi } from "../../../../api/ProjectApi";
import { checkNotNull } from "../../../../core/utils/checkNotNull";
import { uuid } from "../../../../core/utils/uuid";
import { useSession } from "../../../../hooks/useSession";
import { ProjectInfo } from "../../../../services/ProjectInfo";
import { IProject } from "../../../../shared/model/IProject";
import { ITask } from "../../../../shared/model/ITask";

export const useProjectSectionViewModel = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [session] = useSession();
  const [selectedProject, setSelectedProject] = useState<IProject | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    const projectApi = new ProjectApi();
    const projects = await projectApi.findAll();
    setProjects(projects);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const onAdd = async (title: string) => {
    const newProject: IProject = {
      id: uuid(),
      tasks: [],
      title,
      userId: checkNotNull(session).userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProjects((previous) => {
      previous.push(newProject);
      return [...previous];
    });

    const projectApi = new ProjectApi();
    projectApi.insert(newProject);
  };

  const onDelete = (project: IProject) => {
    setProjects((previous) => {
      const index = previous.findIndex((item) => item.id === project.id);
      if (index !== -1) {
        previous.splice(index, 1);
      }
      return [...previous];
    });

    const projectApi = new ProjectApi();
    projectApi.deleteById(project.id);
  };

  const onProjectSelected = (project: IProject) => setSelectedProject(project);

  const onProjectUnselected = () => setSelectedProject(undefined);

  const onStart = (project: IProject) => {
    // check if project is already running, if so, quit starting
    if (ProjectInfo.hasRunningTask(project)) {
      return;
    }

    // create new task and start
    setProjects((previous) => {
      const task: ITask = {
        id: uuid(),
        startedAt: new Date(),
        projectId: project.id,
        title: "Development",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      project.tasks.push(task);

      // update projects
      const index = previous.findIndex((item) => item.id === project.id);
      previous.splice(index, 1, project);
      return [...previous];
    });
  };

  const onStop = (project: IProject) => {
    const task = ProjectInfo.stopRunningTask(project);

    // task was stopped. Updated project
    if (task) {
      setProjects((previous) => {
        const index = previous.findIndex((item) => item.id === project.id);
        previous.splice(index, 1, project);
        return [...previous];
      });
    }
  };

  const onDeleteTask = (project: IProject, task: ITask) => {
    setProjects((previous) => {
      let index = project.tasks.findIndex((item) => item.id === task.id);
      if (index !== -1) {
        project.tasks.splice(index, 1);
      }
      index = previous.findIndex((item) => item.id === project.id);
      previous.splice(index, 1, project);
      return [...previous];
    });
  };

  return {
    isLoading,
    onAdd,
    onDelete,
    onDeleteTask,
    onProjectSelected,
    onProjectUnselected,
    onStart,
    onStop,
    projects,
    selectedProject,
  };
};