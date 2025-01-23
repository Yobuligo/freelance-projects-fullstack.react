import { Value } from "../../../types/Value";
import { ISettings } from "../types/ISettings";

export interface IAppContext {
  settings: Value<ISettings>;
}
