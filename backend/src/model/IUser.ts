import { ICredentials } from "../shared/model/ICredentials";
import { IEntity } from "../shared/types/IEntity";

export interface IUser extends IEntity, ICredentials {}
