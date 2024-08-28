import { useId } from "react";
import componentStyles from "../../styles/components.module.scss";
import { style } from "../../core/ui/style";
import { Input } from "../input/Input";
import { LabeledElement } from "../labeledElement/LabeledElement";
import { ILabeledInputProps } from "./ILabeledInputProps";

export const LabeledInput: React.FC<ILabeledInputProps> = (props) => {
  const id = useId();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    props.onChange?.(event.target.value);

  return (
    <LabeledElement
      elementId={id}
      label={props.label}
      classNameLabel={props.classNameLabelInput}
    >
      <Input
        className={style(componentStyles.input, props.classNameInput)}
        disabled={props.disabled}
        id={id}
        onChange={onChange}
        onEnter={props.onEnter}
        onEscape={props.onEscape}
        type={props.type ?? "text"}
        value={props.value}
      />
    </LabeledElement>
  );
};
