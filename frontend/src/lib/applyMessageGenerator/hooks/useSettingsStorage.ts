import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { settings as configSettings } from "../config";
import { ISettings } from "../types/ISettings";

export const useSettingsStorage = (): [
  ISettings,
  (newValue: ISettings | ((previous: ISettings) => ISettings)) => void
] => {
  const [settings, setSettings] = useLocalStorage<ISettings>(
    "selfemploy.react.settings",
    configSettings
  );

  return [settings, setSettings];
};
