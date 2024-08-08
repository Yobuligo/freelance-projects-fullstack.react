import { useState } from "react";
import { uuid } from "../../../../core/utils/uuid";
import { ProjectInfo } from "../../../../services/ProjectInfo";
import { IProject } from "../../../../shared/model/IProject";
import { ITask } from "../../../../shared/model/ITask";

export const useProjectSectionViewModel = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<IProject | undefined>(
    undefined
  );

  const onAdd = (title: string) => {
    setProjects((previous) => {
      previous.push({
        id: uuid(),
        tasks: [],
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return [...previous];
    });
  };

  const onDelete = (project: IProject) => {
    setProjects((previous) => {
      const index = previous.findIndex((item) => item.id === project.id);
      if (index !== -1) {
        previous.splice(index, 1);
      }
      return [...previous];
    });
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
