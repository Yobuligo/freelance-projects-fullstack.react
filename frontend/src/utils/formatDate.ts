export const formatDate = (date: Date) => {
  const [dateValue, timeValue] = date.toString().split("T");
  return `${dateValue} ${timeValue.substring(0, 8)}`;
};
