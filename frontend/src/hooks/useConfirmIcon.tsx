import { useState } from "react";
import { ConfirmIcon } from "../components/confirmIcon/ConfirmIcon";

export const useConfirmIcon = () => {
  const [isConfirming, setIsConfirming] = useState(false);

  const content = (text: string) => <ConfirmIcon text={text} />;

  const triggerConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => setIsConfirming(false), 700);
  };

  return {
    content,
    isConfirming,
    triggerConfirm,
  };
};
