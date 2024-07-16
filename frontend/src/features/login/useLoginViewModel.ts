import { useState } from "react";
import { UserApi } from "../../api/UserApi";
import { useToggle } from "../../hooks/useToggle";
import { ICredentials } from "../../shared/model/ICredentials";
import { isError } from "../../shared/utils/isError";

export const useLoginViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMode, toggleLoginMode] = useToggle(true);

  const disableLoginButton = username.length === 0 || password.length === 0;

  const disablePassword = username.length === 0;

  const resetErrorMessage = () => setErrorMessage("");

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
    } catch (error) {
      if (isError(error)) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(`Unknown error while login`);
      }
    }
  };

  const onRegister = () => {};

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
    username,
  };
};
