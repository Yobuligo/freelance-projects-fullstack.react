import { Router } from "express";
import { ProjectCollector } from "../services/projectCollector/ProjectCollector";
import { ProjectMeta } from "../shared/model/IProject";
import { IProviderRequests } from "../shared/model/IProviderRequests";
import { createError } from "../shared/utils/createError";
import { isError } from "../shared/utils/isError";
import { sortProjects } from "../utils/sortProjects";

export class ProjectController {
  readonly router = Router();

  constructor() {
    this.findAll();
  }

  private findAll() {
    this.router.post(ProjectMeta.path, async (req, res) => {
      const providerRequests: IProviderRequests[] = req.body;

      try {
        const projectCollector = new ProjectCollector();
        const projects = await projectCollector.collect(providerRequests);
        const sortedProjects = sortProjects(projects);
        res.status(200).send(sortedProjects);
      } catch (error) {
        if (isError(error)) {
          res.status(500).send(error);
        } else {
          res.status(500).send(createError("Error while loading projects"));
        }
      }
    });
  }
}
