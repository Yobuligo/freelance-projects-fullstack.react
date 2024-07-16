import { useState } from "react";

export const useLoginViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");

  return { errorMessage };
};
