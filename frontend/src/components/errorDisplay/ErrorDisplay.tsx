import { useEffect } from "react";
import { useErrorMessage } from "../../hooks/useErrorMessage";
import { CloseIcon } from "../../icons/CloseIcon";
import { Card } from "../card/Card";
import styles from "./ErrorDisplay.module.scss";

export const ErrorDisplay: React.FC = () => {
  const [errorMessage, setErrorMessage] = useErrorMessage();

  useEffect(() => {
    setErrorMessage("Hello");
  }, [setErrorMessage]);

  const onClose = () => setErrorMessage("");

  return (
    <>
      {errorMessage && (
        <Card className={styles.errorDisplay}>
          {errorMessage}
          <CloseIcon onClick={onClose} />
        </Card>
      )}
    </>
  );
};
