import { IUserConfig } from "../model/IUserConfig";
import { Value } from "../types/Value";
import { useLocalStorage } from "./useLocalStorage";

export const useUserConfig = (): Value<IUserConfig> => {
  const [userConfig, setUserConfig] = useLocalStorage<IUserConfig>(
    "freelance.user-config",
    { collapseCompleted: true, displaySettings: false }
  );
  return [userConfig, setUserConfig];
};
