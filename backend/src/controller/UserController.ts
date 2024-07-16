import { Router } from "express";
import { SessionRepo } from "../repository/SessionRepo";
import { UserRepo } from "../repository/UserRepo";
import { ICredentials } from "../shared/model/ICredentials";
import { createError } from "../shared/utils/createError";

export class UserController {
  readonly router = Router();

  constructor() {
    this.login();
  }

  private login() {
    this.router.post("/login", (req, res) => {
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
}
