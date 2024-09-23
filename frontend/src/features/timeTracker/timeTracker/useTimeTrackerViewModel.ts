import { useToggle } from "../../../hooks/useToggle";

export const useTimeTrackerViewModel = () => {
  const [displaySettings, toggleDisplaySettings] = useToggle(false);

  const onToggleDisplaySettings = () => toggleDisplaySettings();

  return { displaySettings, onToggleDisplaySettings };
};
