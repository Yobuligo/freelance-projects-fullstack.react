import { useCallback, useState } from "react";
import { useErrorMessage } from "./useErrorMessage";

export const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [, setErrorMessage] = useErrorMessage();

  const send = useCallback(
    async (block: () => Promise<void>) => {
      setIsLoading(true);
      try {
        await block();
      } catch (error) {
        setErrorMessage(error as string);
      }
      setIsLoading(false);
    },
    [setErrorMessage]
  );

  return { isLoading, send };
};
