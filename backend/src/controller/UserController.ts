import { Router } from "express";
import { SessionRepo } from "../repository/SessionRepo";
import { UserRepo } from "../repository/UserRepo";
import { ICredentials } from "../shared/model/ICredentials";
import { createError } from "../shared/utils/createError";

export class UserController {
  readonly router = Router();

  constructor() {
    this.login();
    this.register();
  }

  private login() {
    this.router.post("/users/login", (req, res) => {
      const credentials: ICredentials = req.body;
      const user = UserRepo.findByCredentials(credentials);
      if (!user) {
        return res
          .status(404)
          .send(createError(`Incorrect username or password.`));
      }
      const session = SessionRepo.createUserSession(credentials.username);
      res.status(201).send(session);
    });
  }

  private register() {
    this.router.post("/users/register", (req, res) => {
      const credentials: ICredentials = req.body;
      const user = UserRepo.findByUsername(credentials.username);
      if (user) {
        return res.status(409).send(createError(`User already exists.`));
      }
      UserRepo.createUser(credentials);
      return res.status(201).send(true);
    });
  }
}
