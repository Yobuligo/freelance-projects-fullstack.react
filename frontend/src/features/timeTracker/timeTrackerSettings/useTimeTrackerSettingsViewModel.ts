import { IToggleButtonOption } from "../../../components/toggleButtonGroup/IToggleButtonOption";
import { useRenderTimeUnit } from "../../../hooks/useRenderTimeUnit";
import { useTimeTrackerSettings } from "../../../hooks/useTimeTrackerSettings";
import { TimeUnit } from "../../../types/TimeUnit";

export const useTimeTrackerSettingsViewModel = () => {
  const [timeTrackerSettings, setTimeTrackerSettings] =
    useTimeTrackerSettings();
  const renderTimeUnit = useRenderTimeUnit();

  const timeUnitOptions: IToggleButtonOption<TimeUnit>[] = [
    { key: TimeUnit.DAYS, text: renderTimeUnit(TimeUnit.DAYS) },
    { key: TimeUnit.HOURS, text: renderTimeUnit(TimeUnit.HOURS) },
    { key: TimeUnit.WORKING_DAYS, text: renderTimeUnit(TimeUnit.WORKING_DAYS) },
  ];

  const selectedTimeUnit: IToggleButtonOption<TimeUnit> =
    timeUnitOptions.find(
      (timeUnitOption) =>
        timeUnitOption.key === timeTrackerSettings.selectedTimeUnit
    ) ?? timeUnitOptions[0];

  const onSelectTimeUnit = (timeUnit: IToggleButtonOption<TimeUnit>) =>
    setTimeTrackerSettings((previous) => {
      previous.selectedTimeUnit = timeUnit.key;
      return { ...previous };
    });

  return { onSelectTimeUnit, selectedTimeUnit, timeUnitOptions };
};
