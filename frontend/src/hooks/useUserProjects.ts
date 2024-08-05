import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { IUserOpportunity } from "../shared/model/IUserOpportunity";
import { Value } from "../types/Value";

export const useUserProjects = (): Value<IUserOpportunity[]> => {
  const context = useContext(AppContext);
  return [context.userProjects[0], context.userProjects[1]];
};
