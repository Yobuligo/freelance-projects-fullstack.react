import { IHaveChange } from "../../../../core/types/IHaveChange";
import { IApplicationText } from "../../types/IApplicationText";

export interface IApplicationTextConfigProps extends IHaveChange<string[]> {
  applicationTexts: IApplicationText[];
}
