import { ProjectRepo } from "../repository/ProjectRepo";
import { IProject, ProjectMeta } from "../shared/model/IProject";
import { EntityController } from "./EntityController";

export class ProjectController extends EntityController<IProject> {
  constructor() {
    super(ProjectMeta, new ProjectRepo());
    this.findAll();
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
}
