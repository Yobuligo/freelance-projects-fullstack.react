import {
  IUserProviderRequest,
  UserProviderRequestRouteMeta,
} from "../shared/model/IUserProviderRequest";
import { EntityRepository } from "./core/EntityRepository";

export class UserProviderRequestApi extends EntityRepository<IUserProviderRequest> {
  constructor() {
    super(UserProviderRequestRouteMeta);
  }
}
