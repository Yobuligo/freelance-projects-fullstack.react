import { useErrorMessage } from "../../hooks/useErrorMessage";
import { Card } from "../card/Card";
import styles from "./ErrorDisplay.module.scss";

export const ErrorDisplay: React.FC = () => {
  const [errorMessage] = useErrorMessage();
  return <Card className={styles.errorDisplay}>{errorMessage}</Card>;
};
