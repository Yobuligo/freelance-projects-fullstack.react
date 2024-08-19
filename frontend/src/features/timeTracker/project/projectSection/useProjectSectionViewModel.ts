import { useCallback, useState } from "react";
import { ProjectApi } from "../../../../api/ProjectApi";
import { checkNotNull } from "../../../../core/utils/checkNotNull";
import { uuid } from "../../../../core/utils/uuid";
import { useInitialize } from "../../../../hooks/useInitialize";
import { useRecentlyUsedProjects } from "../../../../hooks/useRecentlyUsedProjects";
import { useRequest } from "../../../../hooks/useRequest";
import { useSession } from "../../../../hooks/useSession";
import { ProjectInfo } from "../../../../shared/services/ProjectInfo";
import { IProject } from "../../../../shared/model/IProject";
import { ITask } from "../../../../shared/model/ITask";
import { TaskApi } from "./../../../../api/TaskApi";

export const useProjectSectionViewModel = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [session] = useSession();
  const [recentlyUsedProjectIds, insertRecentlyUsedProject] =
    useRecentlyUsedProjects();
  const [selectedProject, setSelectedProject] = useState<IProject | undefined>(
    undefined
  );
  const addProjectRequest = useRequest();
  const loadProjectRequest = useRequest();
  const deleteProjectRequest = useRequest();
  const updateProjectRequest = useRequest();
  const taskRequest = useRequest();

  const loadProjects = useCallback(async () => {
    loadProjectRequest.send(async () => {
      const projectApi = new ProjectApi();
      const projects = await projectApi.findAll();
      setProjects(projects);
    });
  }, [loadProjectRequest]);

  useInitialize(() => {
    loadProjects();
  });

  const findRecentlyUsedProjects = () => {
    const projectMap = new Map(
      projects.map((project) => [project.id, project])
    );
    const recentlyUsedProjects: IProject[] = [];
    recentlyUsedProjectIds.forEach((recentlyUsedProjectIds) => {
      const project = projectMap.get(recentlyUsedProjectIds);
      if (project) {
        recentlyUsedProjects.push(project);
      }
    });
    return recentlyUsedProjects;
  };

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

    addProjectRequest.send(async () => {
      const projectApi = new ProjectApi();
      await projectApi.insert(newProject);
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

    deleteProjectRequest.send(async () => {
      const projectApi = new ProjectApi();
      await projectApi.deleteById(project.id);
    });
  };

  const onUpdateProject = (project: IProject) =>
    setProjects((previous) => {
      const index = previous.findIndex((item) => item.id === project.id);
      previous.splice(index, 1, project);
      return [...previous];
    });

  const onChange = (project: IProject) => {
    onUpdateProject(project);
    updateProjectRequest.send(async () => {
      const projectApi = new ProjectApi();
      await projectApi.update(project);
    });
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
      title: project.defaultTaskTitle ?? "Development",
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
    taskRequest.send(async () => {
      const taskApi = new TaskApi();
      await taskApi.insert(task);
    });

    // add project to list of recently started projects
    insertRecentlyUsedProject(project.id);
  };

  const onStop = (project: IProject) => {
    const task = ProjectInfo.stopRunningTask(project);

    // task was stopped. Update project to refresh UI
    if (task) {
      onUpdateProject(project);

      // update task in backend
      taskRequest.send(async () => {
        const taskApi = new TaskApi();
        await taskApi.update(task);
      });
    }
  };

  const onChangeTask = (project: IProject, task: ITask) => {
    onUpdateProject(project);

    // update task in backed
    taskRequest.send(async () => {
      const taskApi = new TaskApi();
      await taskApi.update(task);
    });
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
    taskRequest.send(async () => {
      const taskApi = new TaskApi();
      await taskApi.deleteById(task.id);
    });
  };

  return {
    addProjectRequest,
    findRecentlyUsedProjects,
    loadProjectRequest,
    onAdd,
    onChange,
    onChangeTask,
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
