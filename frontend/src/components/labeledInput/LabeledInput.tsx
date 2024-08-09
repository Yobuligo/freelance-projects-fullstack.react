import { useId } from "react";
import { LabeledElement } from "../labeledElement/LabeledElement";
import { ILabeledInputProps } from "./ILabeledInputProps";
import { style } from "../../utils/style";
import componentStyles from "../../styles/components.module.scss";

export const LabeledInput: React.FC<ILabeledInputProps> = (props) => {
  const id = useId();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    props.onChange?.(event.target.value);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.onEnter?.();
    }
  };

  return (
    <LabeledElement elementId={id} label={props.label}>
      <input
        className={style(componentStyles.input, props.classNameInput)}
        disabled={props.disabled}
        id={id}
        onChange={onChange}
        type={props.type ?? "text"}
        value={props.value}
        onKeyDown={onKeyDown}
      />
    </LabeledElement>
  );
};
