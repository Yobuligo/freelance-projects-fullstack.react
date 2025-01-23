import { IHaveInitialValue } from "../../../../core/types/IHaveInitialValue";
import { Gender } from "./types/Gender";
import { IHaveMessageChange } from "./types/IHaveMessageChange";

export interface ISalutationConfigProps
  extends IHaveMessageChange,
    IHaveInitialValue<Gender> {}
