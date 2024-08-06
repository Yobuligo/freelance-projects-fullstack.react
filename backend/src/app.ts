import express from "express";
import { UserOpportunityController } from "./controller/UserOpportunityController";
import { ProviderDetailsController } from "./controller/ProviderDetailsController";
import { ProviderMetaController } from "./controller/ProviderMetaController";
import { UserController } from "./controller/UserController";
import { Opportunity } from "./model/sequelize/Opportunity";
import { Session } from "./model/sequelize/Session";
import { UserOpportunity } from "./model/sequelize/UserOpportunity";
import { User } from "./model/sequelize/User";
import { UserProviderRequestController } from "./controller/UserProviderRequestController";
import { UserProviderRequest } from "./model/sequelize/UserProviderRequest";

UserProviderRequest.sync({ alter: true });
User.sync({ alter: true });
Session.sync({ alter: true });
Opportunity.sync({ alter: true });
UserOpportunity.sync({ alter: true });

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
server.use("/api", new ProviderMetaController().router);
server.use("/api", new ProviderDetailsController().router);
server.use("/api", new UserController().router);
server.use("/api", new UserProviderRequestController().router);
server.listen(5000);
