import { Router } from "express";
import { ProjectRepo } from "../repository/ProjectRepo";
import { IProject, ProjectMeta } from "../shared/model/IProject";
import { NetworkInfo } from "../shared/services/NetworkInfo";
import { createError } from "../shared/utils/createError";
import { Controller } from "./Controller";

export class ProjectController extends Controller {
  readonly router = Router();

  constructor() {
    super();
    this.findAll();
    this.insert();
  }

  private findAll() {
    this.router.get(ProjectMeta.path, async (req, res) => {
      if (!(await NetworkInfo.isConnected())) {
        return res.status(502).send(createError("Missing internet connection"));
      }

      this.handleSessionRequest(req, res, async (session) => {
        const projectRepo = new ProjectRepo();
        const projects = await projectRepo.findByUserId(session.userId);
        res.status(200).send(projects);
      });
    });
  }

  private insert() {
    this.router.post(ProjectMeta.path, async (req, res) => {
      if (!(await NetworkInfo.isConnected())) {
        return res.status(502).send(createError("Missing internet connection"));
      }

      this.handleSessionRequest(req, res, async () => {
        const project: IProject = req.body;
        const projectRepo = new ProjectRepo();
        const newProject = await projectRepo.insert(project);
        res.status(201).send(newProject);
      });
    });
  }
}
