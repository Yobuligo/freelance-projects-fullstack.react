export interface IInputFieldProps {
  initialValue?: string;
  label?: string;
  suffixLabel?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  widthInRem?: number;
}
