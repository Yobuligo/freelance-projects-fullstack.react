import { IToggleButtonOption } from "../../../components/toggleButtonGroup/IToggleButtonOption";
import { useRenderTimeUnit } from "../../../hooks/useRenderTimeUnit";
import { TimeUnit } from "../../../types/TimeUnit";

export const useTimeTrackerSettingsViewModel = () => {
  const renderTimeUnit = useRenderTimeUnit();

  const timeUnitOptions: IToggleButtonOption<TimeUnit>[] = [
    { key: TimeUnit.DAYS, text: renderTimeUnit(TimeUnit.DAYS) },
    { key: TimeUnit.HOURS, text: renderTimeUnit(TimeUnit.HOURS) },
    { key: TimeUnit.WORKING_DAYS, text: renderTimeUnit(TimeUnit.WORKING_DAYS) },
  ];  

//   selected: IToggleButtonOption<TimeUnit>;  

//   onSelectTimeUnit: (timeUnit: IToggleButtonOption<TimeUnit>) => void;

  return { timeUnitOptions };
};
