export interface IEditableInputProps {
  label: string;
  onChange?: (newValue: string) => void;
  onCancel?: () => void;
  value?: string;
  displayMode?: boolean;
}
