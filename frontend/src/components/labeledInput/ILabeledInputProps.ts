export interface ILabeledInputProps {
  classNameInput?: string;
  classNameLabelInput?: string;
  disabled?: boolean;
  label: string;
  onChange?: (newValue: string) => void;
  onEnter?: () => void;
  onEscape?: () => void;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
}
