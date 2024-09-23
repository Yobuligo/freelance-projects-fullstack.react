import { ITimeTrackerSettings } from "../model/ITimeTrackerSettings";
import { TimeUnit } from "../types/TimeUnit";
import { Value } from "../types/Value";
import { useLocalStorage } from "./useLocalStorage";

export const useTimeTrackerSettingsStorage =
  (): Value<ITimeTrackerSettings> => {
    const [value, setValue] = useLocalStorage<ITimeTrackerSettings>(
      "freelance.timeTracker.settings",
      {
        selectedTimeUnit: TimeUnit.WORKING_DAYS,
      }
    );
    return [value, setValue];
  };
