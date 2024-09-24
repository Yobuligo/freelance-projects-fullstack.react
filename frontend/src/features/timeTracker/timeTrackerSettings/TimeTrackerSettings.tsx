import { Settings } from "../../settings/settings/Settings";
import { TimeUnitSettings } from "../timeUnitSettings/TimeUnitSettings";

export const TimeTrackerSettings: React.FC = () => {
  return (
    <Settings>
      <TimeUnitSettings />
    </Settings>
  );
};
