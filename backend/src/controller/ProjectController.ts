import { ProjectRepo } from "../repository/ProjectRepo";
import { IProject, ProjectRouteMeta } from "../shared/model/IProject";
import { SessionInterceptor } from "./core/SessionInterceptor";
import { EntityController } from "./EntityController";

export class ProjectController extends EntityController<IProject, ProjectRepo> {
  constructor() {
    super(ProjectRouteMeta, new ProjectRepo());
    this.findAll();
  }

  private findAll() {
    this.router.get(
      ProjectRouteMeta.path,
      SessionInterceptor(async (req, res) => {
        const projects = await this.repo.findByUserId(req.session.userId);
        res.status(200).send(projects);
      })
    );
  }
}
