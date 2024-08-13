import { IInputProps } from "./IInputProps";

export const Input: React.FC<IInputProps> = (props) => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.onEnter?.();
    }

    if (event.key === "Escape") {
      props.onEscape?.();
    }
  };
  
  return <input {...props} onKeyDown={onKeyDown} />;
};
