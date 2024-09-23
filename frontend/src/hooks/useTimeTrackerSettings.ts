import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const useTimeTrackerSettings = () => {
  const context = useContext(AppContext);
  return context.timeTrackerSettings;
};
