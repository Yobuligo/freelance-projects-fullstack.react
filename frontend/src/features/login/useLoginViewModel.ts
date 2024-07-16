import { useState } from "react";

export const useLoginViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signInMode, setSignInMode] = useState(true);

  const disableLoginButton = username.length === 0 || password.length === 0;

  const disablePassword = username.length === 0;

  const onDisplayLogin = () => {};

  const onDisplayRegister = () => {};

  return {
    disableLoginButton,
    disablePassword,
    errorMessage,
    onDisplayLogin,
    onDisplayRegister,
    setPassword,
    setUsername,
    signInMode,
    password,
    username,
  };
};
