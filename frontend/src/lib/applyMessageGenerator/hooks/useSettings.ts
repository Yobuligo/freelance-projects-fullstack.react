import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ISettings } from "../types/ISettings";
import { Value } from "../../../types/Value";

export const useSettings = (): Value<ISettings> => {
  const appContext = useContext(AppContext);
  return appContext.settings;
};
