/**
 * Returns if the given {@link timestamp} is older than the given amount of {@link hours} compared to the current time.
 */
export const isOlderThanHours = (timestamp: Date, hours: number): boolean => {
  const now = new Date();
  const timestampCopy = new Date(timestamp);
  timestampCopy.setHours(timestampCopy.getHours() + hours);
  return timestampCopy.getTime() < now.getTime();
};
