import express from "express";
import { ProjectController } from "./controller/ProjectController";

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
server.listen(5000);
