import { useContext } from "react";
import { ProviderDetailsContext } from "../context/ProviderDetailsContext";
import { IProviderDetails } from "../shared/model/IProviderDetails";
import { Value } from "../types/Value";

export const useProviderDetails = (): Value<IProviderDetails[]> => {
  const context = useContext(ProviderDetailsContext);
  return [context.providerDetails[0], context.providerDetails[1]];
};
