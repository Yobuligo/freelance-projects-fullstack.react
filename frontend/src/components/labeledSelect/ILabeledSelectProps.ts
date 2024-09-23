import { ISelectOption } from "../select/ISelectOption";

export interface ILabeledSelectProps<T extends ISelectOption<any>> {
  label: string;
  onSelect?: (option: T) => void;
  options: T[];
  selected?: T;
}
