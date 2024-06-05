export interface ILabeledInputProps {
  classNameInput?: string;
  label: string;
  initialValue?: string;
  onChange?: (newValue: string) => void;
}
