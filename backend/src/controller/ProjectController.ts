import { Router } from "express";
import { ProjectCollector } from "../services/projectCollector/ProjectCollector";
import { ProjectMeta } from "../shared/model/IProject";
import { IProviderRequests } from "../shared/model/IProviderRequests";

export class ProjectController {
  readonly router = Router();

  constructor() {
    this.findAll();
  }

  private findAll() {
    this.router.post(ProjectMeta.path, async (req, res) => {
      const providerRequests: IProviderRequests[] = req.body;
      const projectCollector = new ProjectCollector();
      const projects = await projectCollector.collect(providerRequests);
      res.status(200).send(projects);
    });
  }
}
