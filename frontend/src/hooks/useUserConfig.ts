import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { IUserConfig } from "../model/IUserConfig";
import { Value } from "../types/Value";

export const useUserConfig = (): Value<IUserConfig> => {
  const context = useContext(AppContext);
  return [context.userConfig[0], context.userConfig[1]];
};
