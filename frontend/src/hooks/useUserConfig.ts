import { useState } from "react";
import { IUserConfig } from "../model/IUserConfig";
import { Value } from "../types/Value";
import { readLocalStorage } from "../utils/readLocalStorage";
import { writeLocalStorage } from "../utils/writeLocalStorage";

export const LOCAL_STORAGE_USER_CONFIG_KEY = "freelance.user-config";

export const useUserConfig = (): Value<IUserConfig> => {
  const [userConfig, setUserConfig] = useState<IUserConfig>(
    readLocalStorage<IUserConfig>(LOCAL_STORAGE_USER_CONFIG_KEY) ?? {
      collapseCompleted: true,
    }
  );

  const updateUserConfig = (
    newUserConfig: React.SetStateAction<IUserConfig>
  ) => {
    setUserConfig((previous) => {
      if (typeof newUserConfig === "function") {
        previous = newUserConfig(previous);
        writeLocalStorage(LOCAL_STORAGE_USER_CONFIG_KEY, previous);
        return previous;
      } else {
        writeLocalStorage(LOCAL_STORAGE_USER_CONFIG_KEY, newUserConfig);
        return newUserConfig;
      }
    });
  };

  return [userConfig, updateUserConfig];
};
