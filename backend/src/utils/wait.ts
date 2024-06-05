export const wait = (msec: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), msec);
  });
};
