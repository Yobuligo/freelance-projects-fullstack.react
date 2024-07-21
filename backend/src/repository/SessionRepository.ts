import { Sessions } from "../model/Sessions";
import { ISession } from "../shared/model/ISession";
import { ParentRepository } from "./core/ParentRepository";

export class SessionRepository extends ParentRepository<ISession> {
  constructor() {
    super(Sessions);
  }
}
