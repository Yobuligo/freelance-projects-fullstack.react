import { Router } from "express";
import { OpportunityRepo } from "../repository/OpportunityRepo";
import { UserProjectRepo } from "../repository/UserProjectRepo";
import { ProjectCollector } from "../services/projectCollector/ProjectCollector";
import { IOpportunity } from "../shared/model/IOpportunity";
import { IProviderRequests } from "../shared/model/IProviderRequests";
import { ISession } from "../shared/model/ISession";
import { IUserOpportunity, UserOpportunityMeta } from "../shared/model/IUserOpportunity";
import { NetworkInfo } from "../shared/services/NetworkInfo";
import { createError } from "../shared/utils/createError";
import { isError } from "../shared/utils/isError";
import { sortUserOpportunities } from "../utils/sortUserProjects";
import { Controller } from "./Controller";
import { UserProviderRequestRepo } from "../repository/UserProviderRequestRepo";

export class UserOpportunityController extends Controller {
  readonly router = Router();

  constructor() {
    super();
    this.findAll();
    this.updateAll();
  }

  private findAll() {
    this.router.post(UserOpportunityMeta.path, async (req, res) => {
      if (!(await NetworkInfo.isConnected())) {
        return res.status(502).send(createError("Missing internet connection"));
      }

      this.handleSessionRequest(req, res, async (session) => {
        const providerRequests: IProviderRequests[] = req.body;

        const userProviderRequestRepo = new UserProviderRequestRepo();
        const userProviderRequests = await userProviderRequestRepo.findByUserId(
          session.userId
        );

        try {
          const sortedUserOpportunities = await this.findUserOpportunities(
            providerRequests,
            session
          );
          res.status(200).send(sortedUserOpportunities);
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
    this.router.put(UserOpportunityMeta.path, async (req, res) => {
      if (!(await NetworkInfo.isConnected())) {
        return res.status(502).send(createError("Missing internet connection"));
      }

      this.handleSessionRequest(req, res, async () => {
        const userProjects: IUserOpportunity[] = req.body;
        const userProjectRepo = new UserProjectRepo();
        await userProjectRepo.updateAll(userProjects);
      });
    });
  }

  private async findUserOpportunities(
    providerRequests: IProviderRequests[],
    session: ISession
  ) {
    const collectedOpportunities = await this.collectProjects(providerRequests);
    const opportunities = await this.updateOpportunities(collectedOpportunities);
    const userProjects = await this.updateUserOpportunities(session, opportunities);
    const sortedUserOpportunities = sortUserOpportunities(userProjects);
    return sortedUserOpportunities;
  }

  private async updateUserOpportunities(session: ISession, projects: IOpportunity[]) {
    const userProjectRepo = new UserProjectRepo();
    const userProjects = await userProjectRepo.modify(session.userId, projects);
    return userProjects;
  }

  private async updateOpportunities(collectedProjects: IOpportunity[]) {
    const projectRepo = new OpportunityRepo();
    const projects = await projectRepo.modify(collectedProjects);
    return projects;
  }

  private async collectProjects(providerRequests: IProviderRequests[]) {
    const projectCollector = new ProjectCollector();
    const collectedProjects = await projectCollector.collect(providerRequests);
    return collectedProjects;
  }
}
