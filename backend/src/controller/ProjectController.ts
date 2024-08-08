import { Router } from "express";
import { ProjectMeta } from "../shared/model/IProject";
import { NetworkInfo } from "../shared/services/NetworkInfo";
import { createError } from "../shared/utils/createError";
import { Controller } from "./Controller";

export class ProjectController extends Controller {
  readonly router = Router();

  constructor() {
    super();
    this.findAll();
  }

  private findAll() {
    this.router.get(ProjectMeta.path, async (req, res) => {
      if (!(await NetworkInfo.isConnected())) {
        return res.status(502).send(createError("Missing internet connection"));
      }

      this.handleSessionRequest(req, res, (session) => {});
    });
  }
}
