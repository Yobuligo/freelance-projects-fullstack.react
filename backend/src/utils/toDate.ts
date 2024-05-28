export const toDate = (date: string, time: string): Date => {
  const [day, month, year] = date.split(".");
  time = time += ":00";
  return new Date(`${year}-${month}-${day}T${time}`);
};
