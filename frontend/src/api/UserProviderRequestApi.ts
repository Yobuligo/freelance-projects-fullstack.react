import {
  IUserProviderRequest,
  UserProviderRequestMeta,
} from "../shared/model/IUserProviderRequest";
import { Repository } from "./core/Repository";

export class UserProviderRequestApi extends Repository<IUserProviderRequest> {
  constructor() {
    super(UserProviderRequestMeta);
  }
}
