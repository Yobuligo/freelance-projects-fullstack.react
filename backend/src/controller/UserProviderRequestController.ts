import { Router } from "express";
import { UserProviderRequestRepo } from "../repository/UserProviderRequestRepo";
import {
  IUserProviderRequest,
  UserProviderRequestMeta,
} from "../shared/model/IUserProviderRequest";
import { Controller } from "./Controller";

export class UserProviderRequestController extends Controller {
  readonly router = Router();

  constructor() {
    super();
    this.findAll();
    this.insert();
    this.update();
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

  private insert() {
    this.router.post(UserProviderRequestMeta.path, (req, res) => {
      this.handleSessionRequest(req, res, async () => {
        const userProviderRequest: IUserProviderRequest = req.body;
        const userProviderRequestRepo = new UserProviderRequestRepo();
        const createdUserProviderRequest = await userProviderRequestRepo.insert(
          userProviderRequest
        );
        res.status(201).send(createdUserProviderRequest);
      });
    });
  }

  private update() {
    this.router.put(UserProviderRequestMeta.path, (req, res) => {
      this.handleSessionRequest(req, res, async () => {
        const userProviderRequest: IUserProviderRequest = req.body;
        const userProviderRequestRepo = new UserProviderRequestRepo();
        await userProviderRequestRepo.update(userProviderRequest);
        res.status(200).send(true);
      });
    });
  }
}
