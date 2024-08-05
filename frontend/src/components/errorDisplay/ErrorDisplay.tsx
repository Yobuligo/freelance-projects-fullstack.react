import { useErrorMessage } from "../../hooks/useErrorMessage";
import { CloseIcon } from "../../icons/CloseIcon";
import { Card } from "../card/Card";
import styles from "./ErrorDisplay.module.scss";
import { IErrorDisplayProps } from "./IErrorDisplayProps";

export const ErrorDisplay: React.FC<IErrorDisplayProps> = (props) => {
  const [errorMessage, setErrorMessage] = useErrorMessage();

  const onClose = () => setErrorMessage("");

  return (
    <div className={props.className}>
      {errorMessage && (
        <Card className={styles.errorDisplay}>
          {errorMessage}
          <CloseIcon onClick={onClose} />
        </Card>
      )}
    </div>
  );
};
