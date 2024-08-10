import { ProjectRepo } from "../repository/ProjectRepo";
import { IProject, ProjectRouteMeta } from "../shared/model/IProject";
import { SessionInterceptor } from "./core/SessionInterceptor";
import { EntityController } from "./EntityController";

export class ProjectController extends EntityController<IProject> {
  constructor() {
    super(ProjectRouteMeta, new ProjectRepo());
    this.findAll();
  }

  private findAll() {
    this.router.get(
      ProjectRouteMeta.path,
      SessionInterceptor(async (req, res) => {
        const projectRepo = new ProjectRepo();
        const projects = await projectRepo.findByUserId(req.session.userId);
        res.status(200).send(projects);
      })
    );
  }
}
