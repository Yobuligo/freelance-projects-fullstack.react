import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { IProject } from "../shared/model/IProject";
import { Value } from "../types/Value";

export const useProjects = (): Value<IProject[]> => {
  const context = useContext(AppContext);
  return [context.projects[0], context.projects[1]];
};
