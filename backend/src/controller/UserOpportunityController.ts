import { Router } from "express";
import { DateTime } from "../core/services/date/DateTime";
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
import { ProviderType } from "../shared/types/ProviderType";
import { createError } from "../shared/utils/createError";
import { isError } from "../shared/utils/isError";
import { Controller } from "./Controller";

export class UserOpportunityController extends Controller {
  readonly router = Router();

  constructor() {
    super();
    this.findAll();
    this.updateAll();
  }

  private findAll() {
    this.router.get(UserOpportunityMeta.path, async (req, res) => {
      if (!(await NetworkInfo.isConnected())) {
        return res.status(502).send(createError("Missing internet connection"));
      }

      this.handleSessionRequest(req, res, async (session) => {
        const force: boolean | undefined = req.query.force
          ? req.query.force === "true"
          : undefined;
        try {
          const sortedUserOpportunities = await this.findUserOpportunities(
            session,
            force
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
      this.handleSessionRequest(req, res, async () => {
        const userOpportunities: IUserOpportunity[] = req.body;
        const userOpportunityRepo = new UserOpportunityRepo();
        await userOpportunityRepo.updateAll(userOpportunities);
      });
    });
  }

  private async findUserOpportunities(
    session: ISession,
    force?: boolean
  ): Promise<IUserOpportunity[]> {
    // the user opportunities are matching the current filter (user provider request config)
    const userOpportunities = await this.fetchOpportunities(session, force);

    // in addition add all user opportunities, which are completed or the current user has applied for
    // those entries should always be displayed
    const persistedUserOpportunities = await this.loadUserOpportunities(
      session
    );

    // add fetched opportunities to persisted user opportunities list, if not already part of it
    userOpportunities.forEach((userOpportunity) => {
      const index = persistedUserOpportunities.findIndex(
        (item) => item.id === userOpportunity.id
      );
      if (index === -1) {
        persistedUserOpportunities.push(userOpportunity);
      }
    });

      return persistedUserOpportunities
  }

  private async loadProviderRequests(
    session: ISession,
    force?: boolean
  ): Promise<IProviderRequests[]> {
    const userProviderRequestRepo = new UserProviderRequestRepo();
    const userProviderRequests = await userProviderRequestRepo.findByUserId(
      session.userId,
      true
    );

    const providerRequests: IProviderRequests[] = [];
    userProviderRequests.forEach((userProviderRequest) => {
      const providerRequest =
        providerRequests.find(
          (provideRequest) =>
            provideRequest.providerType === userProviderRequest.provider
        ) ??
        this.createProviderRequest(
          providerRequests,
          userProviderRequest.provider,
          force
        );
      providerRequest.urls.push(userProviderRequest.url);
    });
    return providerRequests;
  }

  private createProviderRequest(
    providerRequests: IProviderRequests[],
    provider: ProviderType,
    force?: boolean
  ): IProviderRequests {
    const providerRequest: IProviderRequests = {
      providerType: provider,
      urls: [],
      force,
    };
    providerRequests.push(providerRequest);
    return providerRequest;
  }

  /**
   * Fetches opportunities from provider by the configured user provider requests.
   * Persists opportunities if currently unknown and create corresponding user opportunities for the current user.
   */
  private async fetchOpportunities(
    session: ISession,
    force?: boolean
  ): Promise<IUserOpportunity[]> {
    const providerRequests = await this.loadProviderRequests(session, force);
    const collectedOpportunities = await this.collectOpportunities(
      providerRequests
    );
    const opportunities = await this.updateOpportunities(
      collectedOpportunities
    );
    const userOpportunities = await this.updateUserOpportunities(
      session,
      opportunities
    );
    return userOpportunities;
  }

  private async updateUserOpportunities(
    session: ISession,
    opportunities: IOpportunity[]
  ): Promise<IUserOpportunity[]> {
    const userOpportunityRepo = new UserOpportunityRepo();
    return await userOpportunityRepo.modify(session.userId, opportunities);
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
    return await userOpportunityRepo.findCompletedOrAppliedByUserId(
      session.userId
    );
  }
}
