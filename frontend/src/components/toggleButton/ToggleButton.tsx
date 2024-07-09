import { IToggleButtonOption } from "../toggleButtonGroup/IToggleButtonOption";
import { IToggleButtonProps } from "./IToggleButtonProps";

export function ToggleButton<T extends IToggleButtonOption>(
  props: IToggleButtonProps<T>
) {
  return <button onClick={props.onSelect}>{props.item.title}</button>;
}
