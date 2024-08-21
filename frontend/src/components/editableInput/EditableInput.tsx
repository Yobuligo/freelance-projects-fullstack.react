import { IEditableInputProps } from "./IEditableInputProps";
import styles from "./EditableInput.module.scss";
import { Input } from "../input/Input";
import { useEffect, useId, useState } from "react";
import { style } from "../../utils/style";
import { CrudButtonPanel } from "../crudButtonPanel/CrudButtonPanel";

export const EditableInput: React.FC<IEditableInputProps> = (props) => {
  const id = useId();
  const [inputValue, setInputValue] = useState(props.value ?? "");
  const [displayMode, setDisplayMode] = useState(props.displayMode ?? true);

  useEffect(() => {
    setDisplayMode(props.displayMode ?? true);
  }, [props.displayMode]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onConfirm = () => {
    setDisplayMode(true);
    props.onChange?.(inputValue);
  };

  const onCancel = () => {
    setDisplayMode(true);
    setInputValue(props.value ?? "");
  };

  return (
    <>
      <label htmlFor={id} className={props.classNameLabel}>
        {props.label}
      </label>
      <Input
        id={id}
        className={style(styles.input, displayMode ? styles.inputDisabled : "")}
        disabled={displayMode}
        onChange={onChange}
        onEnter={onConfirm}
        onEscape={onCancel}
        type="text"
        value={inputValue}
      />
      <CrudButtonPanel
        displayMode={displayMode}
        onCancel={onCancel}
        onConfirm={onConfirm}
        onEditMode={() => setDisplayMode(false)}
      />
    </>
  );
};
