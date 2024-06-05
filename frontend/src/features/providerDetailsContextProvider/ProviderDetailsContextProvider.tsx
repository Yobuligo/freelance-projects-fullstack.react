import { useEffect, useState } from "react";
import { ProviderDetailsApi } from "../../api/ProviderDetailsApi";
import { Spinner } from "../../components/spinner/Spinner";
import { ProviderDetailsContext } from "../../context/ProviderDetailsContext";
import { IProviderDetails } from "../../shared/model/IProviderDetails";
import { request } from "../../utils/request";
import { IProviderDetailsContextProvider } from "./IProviderDetailsContextProviderProps";

export const ProviderDetailsContextProvider: React.FC<
  IProviderDetailsContextProvider
> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [providerDetails, setProviderDetails] = useState<IProviderDetails[]>(
    []
  );

  useEffect(() => {
    request(async () => {
      setIsLoading(true);
      const providerDetails = await ProviderDetailsApi.findAll();
      setProviderDetails(providerDetails);
      setIsLoading(false);
    });
  }, []);

  return (
    <ProviderDetailsContext.Provider
      value={{ providerDetails: [providerDetails, setProviderDetails] }}
    >
      {isLoading ? <Spinner /> : <>{props.children}</>}
    </ProviderDetailsContext.Provider>
  );
};
