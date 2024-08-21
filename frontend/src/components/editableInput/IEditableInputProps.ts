export interface IEditableInputProps {
  classNameLabel?: string;
  displayMode?: boolean;
  label: string;
  onChange?: (newValue: string) => void;
  onCancel?: () => void;
  value?: string;
}
