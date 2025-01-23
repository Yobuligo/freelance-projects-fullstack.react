import { IHaveChange } from "../../../../core/types/IHaveChange";
import { IHaveInitialValue } from "../../../../core/types/IHaveInitialValue";
import { ApplicationMedium } from "./types/ApplicationMedium";

export interface IApplicationMediumConfigProps
  extends IHaveChange<ApplicationMedium>,
    IHaveInitialValue<ApplicationMedium> {}
