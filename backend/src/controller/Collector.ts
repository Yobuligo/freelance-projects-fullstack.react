import { Router } from "express";
import { ProjectCollector } from "../services/projectCollector/ProjectCollector";
import { IProviderRequests } from "../shared/model/IProviderRequests";

export class Collector {
  readonly router = Router();

  constructor() {
    this.collect();
  }

  private collect() {
    this.router.post("/collect", async (req, res) => {
      const providerRequests: IProviderRequests[] = req.body;
      const projectCollector = new ProjectCollector();
      const projects = await projectCollector.collect(providerRequests);
      res.status(200).send(projects);
    });
  }
}
