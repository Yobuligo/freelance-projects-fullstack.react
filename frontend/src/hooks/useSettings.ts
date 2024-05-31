import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ISettings } from "../model/ISettings";
import { Value } from "../types/Value";

export const useSettings = (): Value<ISettings> => {
  const context = useContext(AppContext);
  return [context.settings[0], context.settings[1]];
};
