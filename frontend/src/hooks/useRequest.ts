import { useCallback, useMemo, useState } from "react";
import { InvalidSessionError } from "../shared/errors/InvalidSessionError";
import { NoSessionError } from "../shared/errors/NoSessionError";
import { IError } from "../shared/model/IError";
import { isError } from "../shared/utils/isError";
import { useErrorMessage } from "./useErrorMessage";
import { useLogout } from "./useLogout";
import { texts } from "./useTranslation/texts";
import { useTranslation } from "./useTranslation/useTranslation";
import { ExpiredSessionError } from "../shared/errors/ExpiredSessionError";

export const useRequest = () => {
  const [isProcessing, setIsLoading] = useState(false);
  const [, setErrorMessage] = useErrorMessage();
  const logout = useLogout();
  const { t } = useTranslation();

  const handleError = useCallback(
    (error: IError) => {
      if (
        error.type === NoSessionError.name ||
        error.type === InvalidSessionError.name ||
        error.type === ExpiredSessionError.name
      ) {
        setErrorMessage(t(texts.general.logoutInvalidSession));
        logout.logout();
        return;
      }
      setErrorMessage(error.message);
    },
    [logout, setErrorMessage, t]
  );

  const send = useCallback(
    async (
      block: () => Promise<void>,
      errorHandler?: (error: any) => string
    ) => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        await block();
      } catch (error) {
        // does an error handler handles the error?
        if (errorHandler) {
          setErrorMessage(errorHandler(error));
        } else {
          if (isError(error)) {
            handleError(error);
          } else {
            setErrorMessage("Unknown error while sending REST request.");
          }
        }
      }
      setIsLoading(false);
    },
    [handleError, setErrorMessage]
  );

  const request = useMemo(() => ({ isProcessing, send }), [isProcessing, send]);

  return request;
};
