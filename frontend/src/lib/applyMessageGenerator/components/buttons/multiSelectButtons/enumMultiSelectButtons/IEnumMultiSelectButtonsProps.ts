import { Enum } from "../../../../../../core/types/Enum";
import { IHaveChange } from "../../../../../../core/types/IHaveChange";
import { IHaveInitialValue } from "../../../../../../core/types/IHaveInitialValue";
import { IHaveSingleSelect } from "../types/IHaveSingleSelect";

export interface IEnumMultiSelectButtonsProps<T extends Enum>
  extends IHaveChange<T[keyof T]>,
    IHaveSingleSelect,
    IHaveInitialValue<T[keyof T]> {
  enumType: T;
}
