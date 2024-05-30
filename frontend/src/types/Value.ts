export type Value<T> = [
  value: T,
  setValue: React.Dispatch<React.SetStateAction<T>>
];
