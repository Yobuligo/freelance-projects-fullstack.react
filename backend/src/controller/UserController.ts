import { Router } from "express";
import { SessionRepo } from "../repository/SessionRepo";
import { UserRepo } from "../repository/UserRepo";
import { ICredentials } from "../shared/model/ICredentials";
import { ISession } from "../shared/model/ISession";
import { createError } from "../shared/utils/createError";

export class UserController {
  readonly router = Router();

  constructor() {
    this.login();
    this.logout();
    this.register();
  }

  private login() {
    this.router.post("/users/login", async (req, res) => {
      const credentials: ICredentials = req.body;

      const userRepo = new UserRepo();
      const user = await userRepo.findByCredentials(credentials);
      if (!user) {
        return res
          .status(404)
          .send(createError(`Incorrect username or password.`));
      }

      const sessionRepo = new SessionRepo();
      const session = await sessionRepo.createUserSession(user);
      res.status(201).send(session);
    });
  }

  private logout() {
    this.router.post("/users/logout", async (req, res) => {
      const session: ISession = req.body;
      const sessionRepo = new SessionRepo();
      const success = await sessionRepo.deleteSession(session);
      res.status(200).send(success);
    });
  }

  private register() {
    this.router.post("/users/register", async (req, res) => {
      const credentials: ICredentials = req.body;

      const userRepo = new UserRepo();
      const user = await userRepo.findByUsername(credentials.username);
      if (user) {
        return res.status(409).send(createError(`User already exists.`));
      }
      await userRepo.createUser(credentials);
      return res.status(201).send(true);
    });
  }
}
