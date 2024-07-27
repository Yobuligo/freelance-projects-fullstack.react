import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { IUserProject } from "../shared/model/IUserProject";
import { Value } from "../types/Value";

export const useUserProjects = (): Value<IUserProject[]> => {
  const context = useContext(AppContext);
  return [context.userProjects[0], context.userProjects[1]];
};
