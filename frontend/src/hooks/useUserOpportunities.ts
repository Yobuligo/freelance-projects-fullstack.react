import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { IUserOpportunity } from "../shared/model/IUserOpportunity";
import { Value } from "../types/Value";

export const useUserOpportunities = (): Value<IUserOpportunity[]> => {
  const context = useContext(AppContext);
  return [context.userOpportunities[0], context.userOpportunities[1]];
};
