import express from "express";
import { ProjectController } from "./controller/ProjectController";
import { ProviderDetailsController } from "./controller/ProviderDetailsController";
import { ReportController } from "./controller/ReportController";
import { TaskController } from "./controller/TaskController";
import { UserController } from "./controller/UserController";
import { UserOpportunityController } from "./controller/UserOpportunityController";
import { UserProviderRequestController } from "./controller/UserProviderRequestController";
import { Opportunity } from "./model/sequelize/Opportunity";
import { Project } from "./model/sequelize/Project";
import { Session } from "./model/sequelize/Session";
import { Task } from "./model/sequelize/Task";
import { User } from "./model/sequelize/User";
import { UserOpportunity } from "./model/sequelize/UserOpportunity";
import { UserProviderRequest } from "./model/sequelize/UserProviderRequest";
import { Note } from "./model/sequelize/Note";
import { NoteController } from "./controller/NoteController";

const alter = false;
UserProviderRequest.sync({ alter });
User.sync({ alter });
Session.sync({ alter });
Opportunity.sync({ alter });
UserOpportunity.sync({ alter });
Project.sync({ alter });
Task.sync({ alter });
Note.sync({ alter });

const server = express();
server.use(express.json({ limit: "2mb" }));
server.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
server.use("/api", new UserOpportunityController().router);
server.use("/api", new ProviderDetailsController().router);
server.use("/api", new UserController().router);
server.use("/api", new UserProviderRequestController().router);
server.use("/api", new ProjectController().router);
server.use("/api", new TaskController().router);
server.use("/api", new ReportController().router);
server.use("/api", new NoteController().router);
server.listen(5000);
