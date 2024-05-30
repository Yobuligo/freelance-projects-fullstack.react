import { useState } from "react";

export const useInitialize = (block: () => void) => {
  const [needsInitialize, setNeedsInitialize] = useState(true);
  if (needsInitialize) {
    setNeedsInitialize(false);
    block();
  }
};
