import { useState } from "react";
import { IUserConfig } from "../model/IUserConfig";
import { Value } from "../types/Value";
import { readLocalStorage } from "../utils/readLocalStorage";
import { writeLocalStorage } from "../utils/writeLocalStorage";

export const LOCAL_STORAGE_USER_CONFIG_KEY = "freelance.user-config";

export const useUserConfig = (): Value<IUserConfig> => {
  const [userConfig, setUserConfig] = useState<IUserConfig>(
    readLocalStorage<IUserConfig>(LOCAL_STORAGE_USER_CONFIG_KEY) ?? {
      displayCompleted: false,
    }
  );

  const updateUserConfig = (newUserConfig: IUserConfig) => {
    writeLocalStorage(LOCAL_STORAGE_USER_CONFIG_KEY, newUserConfig);
    setUserConfig(userConfig);
  };

  return [userConfig, updateUserConfig];
};
