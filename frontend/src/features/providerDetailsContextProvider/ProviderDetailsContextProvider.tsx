import { useState } from "react";
import { ProviderDetailsApi } from "../../api/ProviderDetailsApi";
import { Spinner } from "../../components/spinner/Spinner";
import { ProviderDetailsContext } from "../../context/ProviderDetailsContext";
import { useInitialize } from "../../hooks/useInitialize";
import { useRequest } from "../../hooks/useRequest";
import { IProviderDetails } from "../../shared/model/IProviderDetails";
import { IProviderDetailsContextProvider } from "./IProviderDetailsContextProviderProps";

/**
 * A context provider which is required to load the available providers like freelance.de, freelancermap.de etc.
 */
export const ProviderDetailsContextProvider: React.FC<
  IProviderDetailsContextProvider
> = (props) => {
  const request = useRequest();
  const [providerDetails, setProviderDetails] = useState<IProviderDetails[]>(
    []
  );

  useInitialize(() => {
    request.send(async () => {
      const providerDetails = await ProviderDetailsApi.findAll();
      setProviderDetails(providerDetails);
    });
  });

  return (
    <ProviderDetailsContext.Provider
      value={{ providerDetails: [providerDetails, setProviderDetails] }}
    >
      {request.isLoading ? <Spinner color="black" /> : <>{props.children}</>}
    </ProviderDetailsContext.Provider>
  );
};
