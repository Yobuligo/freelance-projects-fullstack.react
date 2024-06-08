import { Router } from "express";
import { ProjectCollector } from "../services/projectCollector/ProjectCollector";
import { ProjectMeta } from "../shared/model/IProject";
import { IProviderRequests } from "../shared/model/IProviderRequests";
import { sortProjects } from "../utils/sortProjects";
import { IError } from "../shared/model/IError";

export class ProjectController {
  readonly router = Router();

  constructor() {
    this.findAll();
  }

  private findAll() {
    this.router.post(ProjectMeta.path, async (req, res) => {
      const error: IError = {
        createdAt: new Date(),
        message: "Error while fetching projects",
      };
      res.status(400).send(error);
      // const providerRequests: IProviderRequests[] = req.body;
      // const projectCollector = new ProjectCollector();
      // const projects = await projectCollector.collect(providerRequests);
      // const sortedProjects = sortProjects(projects)
      // res.status(200).send(sortedProjects);
    });
  }
}
