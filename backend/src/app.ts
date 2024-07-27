import express from "express";
import { UserProjectController } from "./controller/UserProjectController";
import { ProviderDetailsController } from "./controller/ProviderDetailsController";
import { ProviderMetaController } from "./controller/ProviderMetaController";
import { UserController } from "./controller/UserController";
import { Project } from "./model/Projects";
import { Session } from "./model/Session";
import { UserProject } from "./model/UserProject";
import { User } from "./model/User";
import { UserProviderRequestController } from "./controller/UserProviderRequestController";
import { UserProviderRequest } from "./model/UserProviderRequest";

UserProviderRequest.sync({ alter: true });
User.sync({ alter: true });
Session.sync({ alter: true });
Project.sync({ alter: true });
UserProject.sync({ alter: true });

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
server.use("/api", new UserProjectController().router);
server.use("/api", new ProviderMetaController().router);
server.use("/api", new ProviderDetailsController().router);
server.use("/api", new UserController().router);
server.use("/api", new UserProviderRequestController().router);
server.listen(5000);
