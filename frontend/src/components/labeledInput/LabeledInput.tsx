import { useId } from "react";
import { LabeledElement } from "../labeledElement/LabeledElement";
import { ILabeledInputProps } from "./ILabeledInputProps";

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
        className={props.classNameInput}
        id={id}
        onChange={onChange}
        type="text"
        value={props.value}
        onKeyDown={onKeyDown}
      />
    </LabeledElement>
  );
};
