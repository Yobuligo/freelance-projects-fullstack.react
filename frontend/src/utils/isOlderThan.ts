/**
 * Returns if the given {@link timestamp} is older than the given amount of {@link hours} compared to the current time.
 */
export const isOlderThanHours = (timestamp: Date, hours: number): boolean => {
  const now = new Date();
  const timestampCopy = new Date(timestamp);
  // Calculate new timestamp
  // For some reason the timestamp is moved for 2 hours to the future, so subtract it (instead of calculating 24 hours, calculate with 22 hours)
  timestampCopy.setHours(timestampCopy.getHours() + (hours - 2));
  return timestampCopy.getTime() < now.getTime();
};
