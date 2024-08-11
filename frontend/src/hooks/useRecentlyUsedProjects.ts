import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Value } from "../types/Value";

export const useRecentlyUsedProjects = (): Value<string[]> => {
  const context = useContext(AppContext);
  return context.recentlyUsedProjects;
};
