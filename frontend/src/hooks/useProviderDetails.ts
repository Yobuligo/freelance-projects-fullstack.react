import { useContext } from "react";
import { ProviderDetailsContext } from "../context/ProviderDetailsContext";
import { ProviderType } from "../shared/types/ProviderType";

export const useProviderDetails = (): {
  findByType: (type: ProviderType) => string;
} => {
  const context = useContext(ProviderDetailsContext);

  const findByType = (type: ProviderType): string => {
    const providerDetail = context.providerDetails[0].find(
      (item) => item.type === type
    );
    return providerDetail?.title ?? type;
  };

  return { findByType };
};
