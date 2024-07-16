import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../api/UserApi";
import { useSession } from "../../hooks/useSession";
import { useToggle } from "../../hooks/useToggle";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { AppRoutes } from "../../routes/AppRoutes";
import { ICredentials } from "../../shared/model/ICredentials";
import { isError } from "../../shared/utils/isError";

export const useLoginViewModel = () => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMode, toggleLoginMode] = useToggle(true);
  const [, setSession] = useSession();
  const navigate = useNavigate();

  const disableLoginButton = username.length === 0 || password.length === 0;

  const disablePassword = username.length === 0;

  const resetErrorMessage = () => setErrorMessage("");

  const updateErrorMessage = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setSuccessMessage("");
  };

  const onConfirm = () => {
    if (loginMode) {
      onLogin();
    } else {
      onRegister();
    }
  };

  const onLogin = async () => {
    const credentials: ICredentials = { password, username };
    try {
      const session = await UserApi.login(credentials);
      setSession(session);
      navigate(AppRoutes.projects.toPath());
    } catch (error) {
      if (isError(error)) {
        updateErrorMessage(error.message);
      } else {
        updateErrorMessage(t(texts.login.errorLogin));
      }
    }
  };

  const onRegister = async () => {
    const credentials: ICredentials = { password, username };
    try {
      await UserApi.register(credentials);
      setSuccessMessage(t(texts.login.successUserCreated));
      toggleLoginMode(true);
      setPassword("");
    } catch (error) {
      if (isError(error)) {
        updateErrorMessage(error.message);
      } else {
        updateErrorMessage(t(texts.login.errorRegister));
      }
    }
  };

  const onToggleLoginMode = () => {
    toggleLoginMode();
    resetErrorMessage();
  };

  return {
    disableLoginButton,
    disablePassword,
    errorMessage,
    onConfirm,
    onToggleLoginMode,
    setPassword,
    setUsername,
    loginMode,
    password,
    successMessage,
    username,
  };
};
