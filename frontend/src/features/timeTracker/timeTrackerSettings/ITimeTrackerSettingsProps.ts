import { IToggleButtonOption } from "../../../components/toggleButtonGroup/IToggleButtonOption";
import { TimeUnit } from "../../../types/TimeUnit";

export interface ITimeTrackerSettingsProps {
  onSelectTimeUnit?: (timeUnit: IToggleButtonOption<TimeUnit>) => void;
  selected?: IToggleButtonOption<TimeUnit>;
}
