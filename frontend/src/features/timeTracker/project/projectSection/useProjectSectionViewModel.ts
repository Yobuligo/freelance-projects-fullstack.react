import { useCallback, useEffect, useState } from "react";
import { ProjectApi } from "../../../../api/ProjectApi";
import { TaskApi } from "../../../../api/TaskApi";
import { checkNotNull } from "../../../../core/utils/checkNotNull";
import { uuid } from "../../../../core/utils/uuid";
import { useRequest } from "../../../../hooks/useRequest";
import { useSession } from "../../../../hooks/useSession";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { ProjectInfo } from "../../../../services/ProjectInfo";
import { IProject } from "../../../../shared/model/IProject";
import { ITask } from "../../../../shared/model/ITask";
import { isError } from "../../../../shared/utils/isError";
import { useErrorMessage } from "../../../../hooks/useErrorMessage";
import { texts } from "../../../../hooks/useTranslation/texts";

export const useProjectSectionViewModel = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [session] = useSession();
  const [selectedProject, setSelectedProject] = useState<IProject | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [, setErrorMessage] = useErrorMessage();
  const { t } = useTranslation();

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const projectApi = new ProjectApi();
      const projects = await projectApi.findAll();
      setProjects(projects);
    } catch (error) {
      if (isError(error)) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(t(texts.projectSection.errorLoadingProjects));
      }
    }
    setIsLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // check if project is already running, if so, do not start another task
    if (ProjectInfo.hasRunningTask(project)) {
      return;
    }

    const task: ITask = {
      id: uuid(),
      startedAt: new Date(),
      projectId: project.id,
      title: "Development",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // create new task and start
    setProjects((previous) => {
      // add task
      project.tasks.push(task);

      // update projects to refresh UI
      const index = previous.findIndex((item) => item.id === project.id);
      previous.splice(index, 1, project);
      return [...previous];
    });

    // add task to backend
    const taskApi = new TaskApi();
    taskApi.insert(task);
  };

  const onStop = (project: IProject) => {
    const task = ProjectInfo.stopRunningTask(project);

    // task was stopped. Update project to refresh UI
    if (task) {
      setProjects((previous) => {
        const index = previous.findIndex((item) => item.id === project.id);
        previous.splice(index, 1, project);
        return [...previous];
      });

      // update task in backend
      const taskApi = new TaskApi();
      taskApi.update(task);
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

    // delete task in backend
    const taskApi = new TaskApi();
    taskApi.deleteById(task.id);
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
