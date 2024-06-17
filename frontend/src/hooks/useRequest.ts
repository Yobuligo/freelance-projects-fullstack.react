import { useCallback, useState } from "react";
import { isError } from "../shared/utils/isError";
import { useErrorMessage } from "./useErrorMessage";

export const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [, setErrorMessage] = useErrorMessage();

  const send = useCallback(
    async (block: () => Promise<void>) => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        await block();
      } catch (error) {
        if (isError(error)) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Unknown error while sending REST request.");
        }
      }
      setIsLoading(false);
    },
    [setErrorMessage]
  );

  return { isLoading, send };
};
