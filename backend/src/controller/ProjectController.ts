import { Router } from "express";
import { ProjectRepo } from "../repository/ProjectRepo";
import { IProject, ProjectMeta } from "../shared/model/IProject";
import { Controller } from "./Controller";

export class ProjectController extends Controller {
  readonly router = Router();

  constructor() {
    super();
    this.deleteById();
    this.findAll();
    this.insert();
  }

  private deleteById() {
    this.router.delete(ProjectMeta.path, async (req, res) => {});
  }

  private findAll() {
    this.router.get(ProjectMeta.path, async (req, res) => {
      this.handleSessionRequest(req, res, async (session) => {
        const projectRepo = new ProjectRepo();
        const projects = await projectRepo.findByUserId(session.userId);
        res.status(200).send(projects);
      });
    });
  }

  private insert() {
    this.router.post(ProjectMeta.path, async (req, res) => {
      this.handleSessionRequest(req, res, async () => {
        const project: IProject = req.body;
        const projectRepo = new ProjectRepo();
        const newProject = await projectRepo.insert(project);
        res.status(201).send(newProject);
      });
    });
  }
}
