import { useEffect } from "react";
import { SessionRepo } from "../api/core/SessionRepo";
import { ISession } from "../shared/model/ISession";
import { Value } from "../types/Value";
import { useInitialize } from "./useInitialize";
import { useLocalStorage } from "./useLocalStorage";

export const useSessionStorage = (): Value<ISession | undefined> => {
  const session = useLocalStorage<ISession | undefined>(
    "freelance.session",
    undefined
  );

  useInitialize(() => {
    SessionRepo.instance.setSession(session[0]);
  });  

  useEffect(() => {
    SessionRepo.instance.setSession(session[0]);
  }, [session]);

  return session;
};
