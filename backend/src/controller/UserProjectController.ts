import { Router } from "express";
import { ProjectRepo } from "../repository/ProjectRepo";
import { UserProjectRepo } from "../repository/UserProjectRepo";
import { ProjectCollector } from "../services/projectCollector/ProjectCollector";
import { IProject } from "../shared/model/IProject";
import { IProviderRequests } from "../shared/model/IProviderRequests";
import { ISession } from "../shared/model/ISession";
import { IUserProject, UserProjectMeta } from "../shared/model/IUserProject";
import { NetworkInfo } from "../shared/services/NetworkInfo";
import { createError } from "../shared/utils/createError";
import { isError } from "../shared/utils/isError";
import { sortUserProjects } from "../utils/sortUserProjects";
import { Controller } from "./Controller";

export class UserProjectController extends Controller {
  readonly router = Router();

  constructor() {
    super();
    this.findAll();
    this.updateAll();
  }

  private findAll() {
    this.router.post(UserProjectMeta.path, async (req, res) => {
      if (!(await NetworkInfo.isConnected())) {
        return res.status(502).send(createError("Missing internet connection"));
      }

      this.handleSessionRequest(req, res, async (session) => {
        const providerRequests: IProviderRequests[] = req.body;
        try {
          const sortedUserProjects = await this.findUserProjects(
            providerRequests,
            session
          );
          res.status(200).send(sortedUserProjects);
        } catch (error) {
          if (isError(error)) {
            res.status(500).send(error);
          } else {
            res.status(500).send(createError("Error while loading projects"));
          }
        }
      });
    });
  }

  private updateAll() {
    this.router.put(UserProjectMeta.path, async (req, res) => {
      if (!(await NetworkInfo.isConnected())) {
        return res.status(502).send(createError("Missing internet connection"));
      }

      this.handleSessionRequest(req, res, async () => {
        const userProjects: IUserProject[] = req.body;
        const userProjectRepo = new UserProjectRepo();
        await userProjectRepo.updateAll(userProjects);
      });
    });
  }

  private async findUserProjects(
    providerRequests: IProviderRequests[],
    session: ISession
  ) {
    const collectedProjects = await this.collectProjects(providerRequests);
    const projects = await this.updateProjects(collectedProjects);
    const userProjects = await this.updateUserProjects(session, projects);
    const sortedUserProjects = sortUserProjects(userProjects);
    return sortedUserProjects;
  }

  private async updateUserProjects(session: ISession, projects: IProject[]) {
    const userProjectRepo = new UserProjectRepo();
    const userProjects = await userProjectRepo.modify(session.userId, projects);
    return userProjects;
  }

  private async updateProjects(collectedProjects: IProject[]) {
    const projectRepo = new ProjectRepo();
    const projects = await projectRepo.modify(collectedProjects);
    return projects;
  }

  private async collectProjects(providerRequests: IProviderRequests[]) {
    const projectCollector = new ProjectCollector();
    const collectedProjects = await projectCollector.collect(providerRequests);
    return collectedProjects;
  }
}
