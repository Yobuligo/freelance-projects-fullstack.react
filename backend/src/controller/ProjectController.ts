import { Router } from "express";
import { ProjectRepo } from "../repository/ProjectRepo";
import { ProjectCollector } from "../services/projectCollector/ProjectCollector";
import { ProjectMeta } from "../shared/model/IProject";
import { IProviderRequests } from "../shared/model/IProviderRequests";
import { NetworkInfo } from "../shared/services/NetworkInfo";
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
      if (!(await NetworkInfo.isConnected())) {
        return res.status(502).send(createError("Missing internet connection"));
      }

      const providerRequests: IProviderRequests[] = req.body;

      try {
        // collect projects
        const projectCollector = new ProjectCollector();
        const projects = await projectCollector.collect(providerRequests);
        const sortedProjects = sortProjects(projects);

        // persist projects
        const projectRepo = new ProjectRepo();
        await projectRepo.addAllIfNotExist(sortedProjects);

        // load user projects from db

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
