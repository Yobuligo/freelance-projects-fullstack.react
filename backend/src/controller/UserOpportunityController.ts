import { Router } from "express";
import { OpportunityRepo } from "../repository/OpportunityRepo";
import { UserOpportunityRepo } from "../repository/UserOpportunityRepo";
import { UserProviderRequestRepo } from "../repository/UserProviderRequestRepo";
import { OpportunityCollector } from "../services/opportunityCollector/OpportunityCollector";
import { IOpportunity } from "../shared/model/IOpportunity";
import { IProviderRequests } from "../shared/model/IProviderRequests";
import { ISession } from "../shared/model/ISession";
import {
  IUserOpportunity,
  UserOpportunityMeta,
} from "../shared/model/IUserOpportunity";
import { NetworkInfo } from "../shared/services/NetworkInfo";
import { createError } from "../shared/utils/createError";
import { isError } from "../shared/utils/isError";
import { sortUserOpportunities } from "../utils/sortUserOpportunities";
import { Controller } from "./Controller";

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
            res
              .status(500)
              .send(createError("Error while loading opportunities"));
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
        const userOpportunities: IUserOpportunity[] = req.body;
        const userOpportunityRepo = new UserOpportunityRepo();
        await userOpportunityRepo.updateAll(userOpportunities);
      });
    });
  }

  private async findUserOpportunities(
    providerRequests: IProviderRequests[],
    session: ISession
  ) {
    await this.fetchNewOpportunities(providerRequests, session);
    return await this.loadUserOpportunities(session);
  }

  private async fetchNewOpportunities(
    providerRequests: IProviderRequests[],
    session: ISession
  ) {
    const collectedOpportunities = await this.collectOpportunities(
      providerRequests
    );
    const opportunities = await this.updateOpportunities(
      collectedOpportunities
    );
    await this.updateUserOpportunities(session, opportunities);
  }

  private async updateUserOpportunities(
    session: ISession,
    opportunities: IOpportunity[]
  ) {
    const userOpportunityRepo = new UserOpportunityRepo();
    await userOpportunityRepo.modify(session.userId, opportunities);
  }

  private async updateOpportunities(collectedOpportunities: IOpportunity[]) {
    const opportunityRepo = new OpportunityRepo();
    const opportunities = await opportunityRepo.modify(collectedOpportunities);
    return opportunities;
  }

  private async collectOpportunities(providerRequests: IProviderRequests[]) {
    const opportunityCollector = new OpportunityCollector();
    const collectedOpportunities = await opportunityCollector.collect(
      providerRequests
    );
    return collectedOpportunities;
  }

  private async loadUserOpportunities(session: ISession) {
    const userOpportunityRepo = new UserOpportunityRepo();
    const userOpportunities = await userOpportunityRepo.findByUserId(
      session.userId
    );
    return sortUserOpportunities(userOpportunities);
  }
}
