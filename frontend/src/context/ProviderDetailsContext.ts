import { createContext } from "react";
import { IProviderDetailsContext } from "./IProviderDetailsContext";

export const ProviderDetailsContext = createContext<IProviderDetailsContext>(
  null!
);
