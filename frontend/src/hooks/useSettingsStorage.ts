import { ISettings } from "../model/ISettings";
import { Value } from "../types/Value";
import { useLocalStorage } from "./useLocalStorage";

export const useSettingsStorage = (): Value<ISettings> => {
  const [settings, setSettings] = useLocalStorage<ISettings>(
    "freelance.settings",
    { providerRequests: [] }
  );
  return [settings, setSettings];
};
