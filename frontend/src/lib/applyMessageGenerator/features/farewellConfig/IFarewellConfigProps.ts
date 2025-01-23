import { IHaveChange } from "../../../../core/types/IHaveChange";
import { IFarewell } from "./IFarewell";

export interface IFarewellConfigProps extends IHaveChange<IFarewell> {
  initialFarewell?: IFarewell;
}
