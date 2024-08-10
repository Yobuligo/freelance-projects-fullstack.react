import { Router } from "express";
import { UserProviderRequestRepo } from "../repository/UserProviderRequestRepo";
import {
  IUserProviderRequest,
  UserProviderRequestRouteMeta,
} from "../shared/model/IUserProviderRequest";
import { Controller } from "./Controller";
import { SessionInterceptor } from "./core/sessionInterceptor";

export class UserProviderRequestController extends Controller {
  readonly router = Router();

  constructor() {
    super();
    this.findAll();
    this.insert();
    this.update();
  }

  private findAll() {
    this.router.get(
      UserProviderRequestRouteMeta.path,
      SessionInterceptor(async (req, res) => {
        const userProviderRequestRepo = new UserProviderRequestRepo();
        const userProviderRequests = await userProviderRequestRepo.findByUserId(
          req.session.userId
        );
        res.status(200).send(userProviderRequests);
      })
    );
  }

  private insert() {
    this.router.post(
      UserProviderRequestRouteMeta.path,
      SessionInterceptor(async (req, res) => {
        const userProviderRequest: IUserProviderRequest = req.body;
        const userProviderRequestRepo = new UserProviderRequestRepo();
        const createdUserProviderRequest = await userProviderRequestRepo.insert(
          userProviderRequest
        );
        res.status(201).send(createdUserProviderRequest);
      })
    );
  }

  private update() {
    this.router.put(
      UserProviderRequestRouteMeta.path,
      SessionInterceptor(async (req, res) => {
        const userProviderRequest: IUserProviderRequest = req.body;
        const userProviderRequestRepo = new UserProviderRequestRepo();
        await userProviderRequestRepo.update(userProviderRequest);
        res.status(200).send(true);
      })
    );
  }
}
