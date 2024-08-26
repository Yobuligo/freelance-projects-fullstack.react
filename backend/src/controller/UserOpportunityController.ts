import { NoteRepo } from "../repository/NoteRepo";
import { OpportunityRepo } from "../repository/OpportunityRepo";
import { UserOpportunityRepo } from "../repository/UserOpportunityRepo";
import { UserProviderRequestRepo } from "../repository/UserProviderRequestRepo";
import { OpportunityCollector } from "../services/opportunityCollector/OpportunityCollector";
import { INote, NoteRouteMeta } from "../shared/model/INote";
import { IOpportunity } from "../shared/model/IOpportunity";
import { IProviderRequests } from "../shared/model/IProviderRequests";
import { ISession } from "../shared/model/ISession";
import {
  IUserOpportunity,
  UserOpportunitiesRouteMeta,
} from "../shared/model/IUserOpportunity";
import { ProviderType } from "../shared/types/ProviderType";
import { createError } from "../shared/utils/createError";
import { isError } from "../shared/utils/isError";
import { NetworkCheckInterceptor } from "./core/NetworkCheckInterceptor";
import { SessionInterceptor } from "./core/SessionInterceptor";
import { EntityController } from "./core/EntityController";

export class UserOpportunityController extends EntityController<
  IUserOpportunity,
  UserOpportunityRepo
> {
  constructor() {
    super(UserOpportunitiesRouteMeta, new UserOpportunityRepo());
    this.findAll();
    this.updateAll();
    this.addNote();
  }

  private addNote() {
    this.router.post(
      `${UserOpportunitiesRouteMeta.path}/:id/${NoteRouteMeta.path}`,
      NetworkCheckInterceptor(),
      SessionInterceptor(async (req, res) => {
        try {
          const note: INote = req.body;
          const newNote = await new NoteRepo().insert(note);
          await this.repo.attachNote(req.params.id, newNote);
          res.status(201).send(newNote);
        } catch (error) {
          res
            .status(500)
            .send(createError("Error while adding note to opportunity"));
        }
      })
    );
  }

  private findAll() {
    this.router.get(
      UserOpportunitiesRouteMeta.path,
      NetworkCheckInterceptor(),
      SessionInterceptor(async (req, res) => {
        const force: boolean | undefined = req.query.force
          ? req.query.force === "true"
          : undefined;
        try {
          const sortedUserOpportunities = await this.findUserOpportunities(
            req.session,
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
      })
    );
  }

  private updateAll() {
    this.router.put(
      UserOpportunitiesRouteMeta.path,
      SessionInterceptor(async (req, res) => {
        const userOpportunities: IUserOpportunity[] = req.body;
        await this.repo.updateAll(userOpportunities);
        res.status(200).send(true);
      })
    );
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

    return persistedUserOpportunities;
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
    return await this.repo.modify(session.userId, opportunities);
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
    return await this.repo.findCompletedOrAppliedByUserId(session.userId);
  }
}
