export const isError = (value: any): value is Error => {
  return "message" in value && "stack" in value && "name" in value;
};
