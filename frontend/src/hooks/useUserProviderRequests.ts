import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { IUserProviderRequest } from "../shared/model/IUserProviderRequest";
import { Value } from "../types/Value";

export const useUserProviderRequests = (): Value<IUserProviderRequest[]> => {
  const context = useContext(AppContext);
  return context.userProviderRequests;
};
