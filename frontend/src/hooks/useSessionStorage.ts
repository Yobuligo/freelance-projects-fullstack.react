import { ISession } from "../shared/model/ISession";
import { Value } from "../types/Value";
import { useLocalStorage } from "./useLocalStorage";

export const useSessionStorage = (): Value<ISession | undefined> => {
  const session = useLocalStorage<ISession | undefined>(
    "freelance.session",
    undefined
  );
  return session;
};
