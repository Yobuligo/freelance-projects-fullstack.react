import { Router } from "express";
import { UserProviderRequestRepo } from "../repository/UserProviderRequestRepo";
import {
  IUserProviderRequest,
  UserProviderRequestRouteMeta,
} from "../shared/model/IUserProviderRequest";
import { SessionInterceptor } from "./core/SessionInterceptor";
import { EntityController } from "./EntityController";

export class UserProviderRequestController extends EntityController<
  IUserProviderRequest,
  UserProviderRequestRepo
> {
  constructor() {
    super(UserProviderRequestRouteMeta, new UserProviderRequestRepo());
    this.findAll();
  }

  private findAll() {
    this.router.get(
      UserProviderRequestRouteMeta.path,
      SessionInterceptor(async (req, res) => {
        const userProviderRequests = await this.repo.findByUserId(
          req.session.userId
        );
        res.status(200).send(userProviderRequests);
      })
    );
  }
}
