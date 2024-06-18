export interface ILabeledInputProps {
  classNameInput?: string;
  label: string;
  onChange?: (newValue: string) => void;
  onEnter?: () => void;
  value?: string;
}
