import express from "express";
import { ProjectController } from "./controller/ProjectController";
import { ProviderDetailsController } from "./controller/ProviderDetailsController";
import { ProviderMetaController } from "./controller/ProviderMetaController";
import { UserController } from "./controller/UserController";
import { Projects } from "./model/Projects";
import { Sessions } from "./model/Sessions";
import { UserProjects } from "./model/UserProjects";
import { Users } from "./model/Users";

Users.sync();
Sessions.sync();
Projects.sync();
UserProjects.sync();

const server = express();
server.use(express.json());
server.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
server.use("/api", new ProjectController().router);
server.use("/api", new ProviderMetaController().router);
server.use("/api", new ProviderDetailsController().router);
server.use("/api", new UserController().router);
server.listen(5000);
