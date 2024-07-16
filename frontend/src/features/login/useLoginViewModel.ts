import { useState } from "react";
import { useToggle } from "../../hooks/useToggle";

export const useLoginViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMode, toggleLoginMode] = useToggle(true);

  const disableLoginButton = username.length === 0 || password.length === 0;

  const disablePassword = username.length === 0;

  const onToggleLoginMode = () => toggleLoginMode();

  return {
    disableLoginButton,
    disablePassword,
    errorMessage,
    onToggleLoginMode,
    setPassword,
    setUsername,
    loginMode,
    password,
    username,
  };
};
