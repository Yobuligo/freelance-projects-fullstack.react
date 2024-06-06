import { useState } from "react";
import { Value } from "../types/Value";

export const useErrorMessage = (): Value<string> => {
  const [errorMessage, setErrorMessage] = useState("");
  return [errorMessage, setErrorMessage];
};
