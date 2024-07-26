import { Router } from "express";
import { ProjectRepo } from "../repository/ProjectRepo";
import { SessionRepo } from "../repository/SessionRepo";
import { ProjectCollector } from "../services/projectCollector/ProjectCollector";
import { ProjectMeta } from "../shared/model/IProject";
import { IProviderRequests } from "../shared/model/IProviderRequests";
import { NetworkInfo } from "../shared/services/NetworkInfo";
import { IHaveToken } from "../shared/types/IHaveToken";
import { createError } from "../shared/utils/createError";
import { isError } from "../shared/utils/isError";
import { sortProjects } from "../utils/sortProjects";
import { error } from "../shared/utils/error";

export class ProjectController {
  readonly router = Router();

  constructor() {
    this.findAll();
  }

  private findAll() {
    this.router.post<IHaveToken>(ProjectMeta.path, async (req, res) => {
      if (!(await NetworkInfo.isConnected())) {
        return res.status(502).send(createError("Missing internet connection"));
      }

      const token = req.query.token ?? error("Error while reading token")

      const sessionRepo = new SessionRepo();
      const session = await sessionRepo.findById(token.toString());
      if (!session) {
        return res.status(401).send(createError("Invalid user session"));
      }

      const providerRequests: IProviderRequests[] = req.body;

      try {
        // collect projects
        const projectCollector = new ProjectCollector();
        const projects = await projectCollector.collect(providerRequests);
        const sortedProjects = sortProjects(projects);

        // update projects master data if they not exist
        const projectRepo = new ProjectRepo();
        await projectRepo.modify(sortedProjects);

        // find user projects for projects

        // insert new user projects if not yet exist

        // return user projects

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
