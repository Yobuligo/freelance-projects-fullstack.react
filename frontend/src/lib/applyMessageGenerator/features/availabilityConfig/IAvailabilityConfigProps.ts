export interface IAvailabilityConfigProps {
  initialValue?: boolean;
  onChange: (availableFrom: string | undefined) => void;
}
