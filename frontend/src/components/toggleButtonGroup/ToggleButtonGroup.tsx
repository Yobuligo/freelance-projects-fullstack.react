import { useState } from "react";
import { ToggleButton } from "../toggleButton/ToggleButton";
import { IToggleButtonGroupProps } from "./IToggleButtonGroupProps";
import { IToggleButtonOption } from "./IToggleButtonOption";

export function ToggleButtonGroup<T extends IToggleButtonOption>(
  props: IToggleButtonGroupProps<T>
) {
  const [selected, setSelected] = useState(props.selected);
  const items = props.items.map((item) => (
    <ToggleButton
      item={item}
      onSelect={() => setSelected(item)}
      selected={item === selected}
    />
  ));

  return <div>{items}</div>;
}
