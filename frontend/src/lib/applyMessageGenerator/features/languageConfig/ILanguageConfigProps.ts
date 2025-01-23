import { IHaveChange } from "../../../../core/types/IHaveChange";
import { IHaveInitialValue } from "../../../../core/types/IHaveInitialValue";
import { Language } from "./types/Language";

export interface ILanguageConfigProps
  extends IHaveChange<Language>,
    IHaveInitialValue<Language> {}
