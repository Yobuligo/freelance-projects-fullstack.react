import { Router } from "express";
import { UserProviderRequestRepo } from "../repository/UserProviderRequestRepo";
import { UserProviderRequestMeta } from "../shared/model/IUserProviderRequest";
import { Controller } from "./Controller";

export class UserProviderRequestController extends Controller {
  readonly router = Router();

  constructor() {
    super();
    this.findAll();
  }

  private findAll() {
    this.router.get(UserProviderRequestMeta.path, async (req, res) => {
      this.handleSessionRequest(req, res, async (session) => {
        const userProviderRequestRepo = new UserProviderRequestRepo();
        const userProviderRequests = await userProviderRequestRepo.findByUserId(
          session.userId
        );
        res.status(200).send(userProviderRequests);
      });
    });
  }
}
