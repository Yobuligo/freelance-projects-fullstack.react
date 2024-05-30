export type Value<T> = [
  value: T,
  setValue: (newValue: T | ((previous: T) => T)) => void
];
